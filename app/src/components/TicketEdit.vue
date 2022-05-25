<template>
	<section class="slide-panel">
		<!-- Toggling the side-panel background color by dynamic class name -->
		<div @click="openSidePanel" :class="{ sidePanelVisible: !isSidePanelVisible }" class="slide-panel__ticket-overlay"></div>
		<div v-if="loading">
			<LoadingPage />	
		</div> 

		<div @click="closeSidePanel" v-else class="slide-panel__ticket" v-for="bug in result" :key="bug._id"> 
			<div class="slide-panel__ticket-content">	
				<div class="ticket-container">
					<div class="ticket-container__header">
						<h1>{{ bug.title }}</h1>
						<RouterLink :to="{ name:'bugsBoard' }">
							<button>
								<img src="/svg/close-button.svg" alt="close-icon">
							</button>
						</RouterLink>
					</div>
					
					<form>
						<section class="ticket-container__form">
							<label for="reporter">Reporter</label>
							<select id="reporter" name="reporter" v-model="bugData.reporter">
								<option v-for="projectMember in bug.project.projectMembers" :key="projectMember._id" :value="projectMember.name">{{ `${projectMember.name}` }}</option>
							</select>

							<label for="assignee">Assignee</label>
							<select id="assignee" name="assignee" v-model="bugData.assignee">
								<option v-for="projectMember in bug.project.projectMembers" :key="projectMember._id" :value="projectMember.name">{{ `${projectMember.name}` }}</option>
							</select>

							<label for="dueDate">Due Date:</label>
							<input class="ticket-container__form-dueData" type="date" id="dueDate" name="dueDate" v-model="bugData.dueDate">

							<label for="description">Description</label> 
							<textarea id="description" name="description" rows="4" cols="20" type="text" v-model="bugData.description"></textarea>

							<!-- <label for="screenshot">Screenshot</label>
							<input type="text" id="screenshot" name="screenshot" v-model="bugData.screenshot"> -->

							<label for="priority">Priority</label>
							<select id="priority" name="priority" v-model="bugData.priority">
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
								<option value="critical">Critical</option>
							</select>
								
							<label for="status">Status</label>
							<select id="status" name="status" v-model="bugData.status">
								<option value="not started yet">Not started yet</option>
								<option value="working on it">Working on it</option>
								<option value="stuck">Stuck</option>
								<option value="done">Done</option>
							</select>
								
							<div class="ticket-container__form-footer">
								<button @click="closeTicketSection">
									<input class="ticket-container__form-submit" type="submit" value="submit" @click.prevent="handleSubmit"> 
								</button>

								<button @click="deleteBug(); closeTicketSection()" class="ticket-container__form-delete">Delete</button>
							</div>
						</section>
					</form>
				</div>
			</div>
		</div>	
	</section>

</template>

<script> 
	import sanity from '../sanity.js';
	import query from '../groq/ticketPage.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	import LoadingPage from '../components/LoadingPage.vue'
	export default {
		mixins: [viewMixin],

		components: {
			LoadingPage
		},

		data() {
			return {
				isSidePanelVisible: false,
				bugData: {
					description: '',
					priority: '',
					status: '',
					dueDate: '',
					reporter: '',
					assignee: '',
				},
				reporterData: '',
				assigneeData: '',
				reporterID: '',
				assigneeID: ''
			}
		},

		async created() {
			await this.changeBugContent()
			console.log(this.$route.path)
		},

		methods: {
			openSidePanel() {
				this.isSidePanelVisible = true;
			},

			closeSidePanel() {
				this.isSidePanelVisible = false;
			},

			async changeBugContent() {
				await this.sanityFetch(query, { 
					slug: this.$route.params.ticketSlug 
				});
				console.log(this.$route.params.ticketSlug)  // Delete after
				this.handleBugData();
			},

			closeTicketSection() {
				this.$router.push('/bugsBoard')
			},

			handleBugData() {
				this.result.map(bug => {
					if(bug.reporter === null) {
						this.bugData.reporter = ''
					} else {
						this.bugData.reporter = bug.reporter.name
					}
					
					if(bug.assignee === null) {
						this.bugData.assignee = ''
					} else {
						this.bugData.assignee = bug.assignee.name;
					}
					
					this.bugData.dueDate = bug.dueDate;
					this.bugData.description = bug.description;
					this.bugData.priority = bug.priority;
					this.bugData.status = bug.status;
					
				})
				console.log(this.bugData)
			},

			handleSubmit() {
				this.reporterData = this.result[0].project.projectMembers.find(member => member.name === this.bugData.reporter);
				this.assigneeData = this.result[0].project.projectMembers.find(member => member.name === this.bugData.assignee);
				console.log(this.projectMember)
					const reporter = {
						_id: this.reporterData._id,
						_type: 'employee',
						name: this.bugData.reporter
					}
					sanity.createIfNotExists(reporter).then((res) => {
						this.reporterID  = res._id;
						// this.updateBug();
						const assignee = {
							_id: this.assigneeData._id,
							_type: 'employee',
							name: this.bugData.assignee,
						}
						sanity.createIfNotExists(assignee).then((res) => {
							this.assigneeID = res._id;
							this.updateBug();
						});
						// this.updateBug();
					});
			},

			updateBug() {
				sanity
					.patch(this.result[0]._id)
					.set({ reporter: {
								_type: 'reference',
								_ref: this.reporterID,
							}, 
						})
					.set({ assignee: {
								_type: 'reference',
								_ref: this.assigneeID,
							}, 
						})
					.set({ description: this.bugData.description, })
					.set({ priority: this.bugData.priority, })
					.set({ status: this.bugData.status, })
					.set({ dueDate: this.bugData.dueDate, })
					.commit()
					.then(() => {
						this.$store.dispatch('fetchAndStoreBugsData');
					});
			},

			deleteBug() {
				    sanity.delete(this.result[0]._id)
					.then(() => {
						this.$store.dispatch('fetchAndStoreBugsData');
					})
					.catch((err) => {
						console.error('Delete failed: ', err.message)
					})
			}
		},
	}
</script>

<style>
	.slide-panel__ticket {
		height: 100%;
		z-index: 1000;
		/* transition: slide 150ms cubic-bezier(0, 0, 0.35, 1); */
	}

	.slide-panel__ticket-content {
		/* transition: slide 0.2s;
		animation: slide cubic-bezier(0.075, 0.82, 0.165, 1); */
        height: 100%;
	} 

	.sidePanelVisible {
		right: 100%;
		width: 3000px;
		top: 0;
		bottom: 0;
		position: absolute;
		background-color: rgba(41, 47, 76, 0.5); 
		/* transition: background .1s ease; */
		/* pointer-events: none; */
		/* display: none; */
	}

	.ticket-container {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		flex-wrap: nowrap;
		height: 100%;
	}

	.ticket-container__header {
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}

	.ticket-container__header img {
		width: 30px;
	}

	.ticket-container form {
		display: flex;
		padding: 0 20px;
	}

	.ticket-container__form {
		display: flex;
		flex-direction: column;
		margin: 10px;
		width: 500px;
	}

	.ticket-container__form textarea {
		font-family: inherit;
		padding: 10px;
	}

	.ticket-container__form label {
		margin: 20px 0 0 0;	
	}

	.ticket-container__form select,
	.ticket-container__form-reporter,
	.ticket-container__form-dueData {
		padding: 10px;
		font-size: 15px;
		border-radius: 10px;
		border: 1.5px solid rgb(218, 218, 218);
		margin: 5px;
	}
	.ticket-container__form-footer {
		display: flex;
		padding-top: 10px;
	}

	.ticket-container__form-submit,
	.ticket-container__form-delete {
		color: #fff;
		font-size: 16px;
		width: 135px;
		height: 50px;
		border: none;
		margin: 10px;
		/* padding: 20px; */
		background: #0272EA; 
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ticket-container__form-submit:hover,
	.ticket-container__form-delete:hover {
		cursor: pointer;
		background: #094f99;
		border: white 2px solid;
	}
</style>

