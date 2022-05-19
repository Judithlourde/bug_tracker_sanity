<template>
	<section class="test">
		<div v-if="loading">...</div> 
		<div v-else class="ticket" v-for="bug in result" :key="bug._id"> 
			<div class="ticket__container">
				<h1>{{ bug.title }}</h1>
				<form>
					<section>
                        <label for="reporter">Reporter</label>
						<input id="reporter" name="reporter" type="text" v-model="bugData.reporter">

                        <label for="assignee">Assignee</label>
						<select id="assignee" name="assignee" v-model="bugData.assignee">
							<option v-for="projectMember in bug.project.projectMembers" :key="projectMember._id" :value="projectMember.name">{{ `${projectMember.name}` }}</option>
						</select>

                        <label for="dueDate">Due Date:</label>
						<input type="date" id="dueDate" name="dueDate" v-model="bugData.dueDate">

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
                            
						<router-link :to="{ name:'dashboard' }">
                        	<input type="submit" @click.prevent="handleSubmit"> 
						</router-link>
					</section>
				</form>
			</div>
		</div>	
	</section>
</template>

<script> 
	import sanity from '../sanity.js';
	import query from '../groq/ticketPage.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	export default {
		mixins: [viewMixin],

		data() {
			return {
				bugData: {
					description: '',
					priority: '',
					status: '',
					dueDate: '',
					reporter: '',
					assignee: '',
				},
				projectMember: '',
			}
		},

		async created() {
			await this.sanityFetch(query, { 
				slug: this.$route.params.ticketSlug 
			});
			this.handleBugData();
		},

		methods: {
			handleBugData() {
				console.log(this.result[0].assignee.name)
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
				this.projectMember = this.result[0].project.projectMembers.find(member => member.name === this.bugData.assignee);
					const assignee = {
							_id: this.projectMember._id,
							_type: 'employee',
							name: this.bugData.assignee,
						}
					sanity.createIfNotExists(assignee).then((res) => {
						this.assigneeID = res._id;
						this.updateBug();
					});
					this.updateBug();
			},

			updateBug() {
				sanity
					.patch(this.result[0]._id)
					.set({ assignee: {
								_type: 'reference',
								_ref: this.projectMember._id,
							}, 
						})
					.set({ description: this.bugData.description, })
					.set({ priority: this.bugData.priority, })
					.set({ status: this.bugData.status, })
					.set({ dueDate: this.bugData.dueDate, })
					.commit()
					.then(updatedDocument => {
						// console.log('I just updated document:', updatedDocument);
					});
			}	
		},
	}
</script>

<style>
	.test {
		position: relative;
		width: 80vw;
		/* position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        object-fit: cover; */
        /* width: 100vw; */
        /* height: 100vh; */
        /* z-index: 400; */
	}

	.ticket {
		position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8;
        /* background-color: rgba(17, 17, 17, 0.7); */
			/* padding: 30px; */
			/* width: 100%; */
	}

	.ticket__container {
		/* width: 100%; */
		display: flex;
		justify-content: center;
		transform: translateX(0);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        max-width: 500px;
        height: 100%;
        width: 100%;
        background-color: #fff;
	}

	.ticket__container form {
		display: flex;
	}

	.ticket__container form section {
		display: flex;
		flex-direction: column;
		margin: 10px;
		width: 500px;
	}

	.ticket__container form label {
		margin: 20px 0 0 0;	
	}

	.ticket__container form select,
	.ticket__container form input {
		padding: 10px;
		font-size: 15px;
		border-radius: 10px;
		border: 1.5px solid rgb(218, 218, 218);
		margin: 5px;
	}

	.ticket__container-multiple-input-container {
		margin: 20px 0 20px 0;
	}
</style>