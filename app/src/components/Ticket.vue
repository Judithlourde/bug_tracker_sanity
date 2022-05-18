<template>
	<section>
		<div v-if="loading">...</div> 
		<div v-else class="ticket" v-for="bug in result" :key="bug._id"> 
			<h1>{{ bug.title }}</h1>
			
			<div class="ticket__container">
				<form>
					<section>
                        <label for="reporter">Reporter</label>
                        <input v-if="bug.reporter !== null " id="reporter" name="reporter" type="text" v-model="bug.reporter.name">
						<input v-else id="reporter" name="reporter" type="text" v-model="bugData.reporter">

                        <label for="assignee">Assignee</label>
						<select v-if="bug.assignee !== null" id="assignee" name="assignee" v-model="bug.assignee.name">
							<option v-for="projectMember in bug.project.projectMembers" :key="projectMember._id" :value="projectMember.name">{{ `${projectMember.name}` }}</option>
						</select>

                        <select v-else id="assignee" name="assignee" v-model="bugData.assignee">
							<option v-for="projectMember in bug.project.projectMembers" :key="projectMember._id" :value="projectMember.name">{{ `${projectMember.name}` }}</option>
						</select>

                        <label for="dueDate">Due Date:</label>
						<input v-if="bug.dueDate" type="date" id="dueData" name="dueDate" v-model="bug.date">
                        <input v-else type="date" id="dueDate" name="dueDate" v-model="bugData.dueDate">

                        <label for="description">Description</label> 
                    	<textarea v-if="bug.description" id="description" name="description" rows="4" cols="20" type="text" v-model="bug.description"></textarea>
						<textarea v-else id="description" name="description" rows="4" cols="20" type="text" v-model="bugData.description"></textarea>

                        <!-- <label for="screenshot">Screenshot</label>
                        <input type="text" id="screenshot" name="screenshot" v-model="bugData.screenshot"> -->

						<label for="priority">Priority</label>
						<select v-if="bug.priority" id="priority" name="priority" v-model="bug.priority">
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
							<option value="critical">Critical</option>
						</select>

						<select v-else id="priority" name="priority" v-model="bugData.priority">
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
							<option value="critical">Critical</option>
						</select>

							<!-- <label for="progress">Progress</label> -->
							<!-- <input type="range" id="progress" name="progress" v-model.number="bug.progress" min="0" max=100> -->
							
						<label for="status">Status</label>
						<select v-if="bug.status" id="status" name="status" v-model="bug.status">
							<option value="not started yet">Not started yet</option>
							<option value="working on it">Working on it</option>
							<option value="stuck">Stuck</option>
							<option value="done">Done</option>
						</select>

						<select v-else id="status" name="status" v-model="bugData.status">
							<option value="not started yet">Not started yet</option>
							<option value="working on it">Working on it</option>
							<option value="stuck">Stuck</option>
							<option value="done">Done</option>
						</select>
                            
						
                        <input type="submit" @click.prevent="handleSubmit">
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
                    screenshot: ''
				},
				reporterID: '',
				assigneeID: '',
				projectMemberID: '',
			}
		},

		async created() {
			await this.sanityFetch(query, { 
				slug: this.$route.params.ticketSlug 
			});
		},

		methods: {
			handleSubmit() {
				this.projectMemberID = this.result[0].project.projectMembers.find(member => member.name === this.bugData.assignee);
				const assignee = {
						_id: this.projectMemberID._id,
						_type: 'employee',
						name: this.bugData.assignee,
					}
				sanity.createIfNotExists(assignee).then((res) => {
					this.assigneeID = res._id;
					this.createBug();
				});

				// console.log(this.result[0]._id)
				// console.log(this.bugData.assignee)
			},

			createBug() {
				sanity
					.patch(this.result[0]._id)
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
					.then(updatedDocument => {
						console.log('I just updated document:', updatedDocument);
					});
			}	
		},
	}
</script>

<style>
	.ticket {
		padding: 30px;
		width: 100%;
	}

	.ticket__container {
		width: 100%;
		display: flex;
		justify-content: center;
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