<template>
	<section>
		<!-- <div v-if="loading">...</div> -->
		<!-- <div v-else class="ticket"> -->
		<div class="ticket">
			<h1 v-if="!editMode">Create a Ticket</h1>
			<h1 v-else>Update your Ticket</h1>
			
			<div class="ticket__container">
				<form>
					<section>
						<label for="title">Title</label>
						<input id="title" name="title" type="text" 	v-model="formData.title"/>

						<label for="description">Description</label> 
                    	<textarea id="description" name="description" rows="3" cols="20" type="text" v-model="formData.description"></textarea>

						<!-- <label for="team">Team</label>
						<select v-bind="getTeamId()" id="team" name="team" v-model="formData.team">
							<option v-for="team in uniqueTeams" :key="team.id" :value="team">{{ team }}</option>
						</select> -->

						<label for="new-team">New Team</label>
						<input id="new-team" name="newTeam" type="text" v-model="formData.newTeam">

						<label for="priority">Priority</label>
						<select id="priority" name="priority" v-model="formData.priority">
							<option value="major">Major</option>
							<option value="low">Low</option>
							<option value="critical">Critical</option>
						</select>

						<div>
							<label for="progress">Progress</label>
							<input type="range" id="progress" name="progress" v-model.number="formData.progress" min="0" max=100>
							
							<label for="status">Status</label>
							<select id="status" name="status" v-model="formData.status">
								<option value="not started">Not started yet</option>
								<option value="working on it">Working on it</option>
								<option value="stuck">Stuck</option>
								<option value="done">Done</option>
							</select>
						</div>

						<input type="submit" @click.prevent="handleSubmit">
					</section>

					<section>
						<label for="reporter">Reporter</label>
						<input id="reporter" name="reporter" type="text" v-model="formData.reporter">

						<label for="reporterImage">Reporter Image</label>
						<input id="reporterImage" name="reporterImage" type="text" v-model="formData.reporterImage">

						<!-- <div class="reporter-image">
							<img v-if="formData.reporterImage" :src="formData.reporterImage" alt="Reporter image">
						</div> -->

						<label for="assignee">Assignee</label>
						<input id="assignee" name="assignee" type="text" v-model="formData.assignee">

						<label for="assigneeImage">Assignee Image</label>
						<input id="assigneeImage" name="assigneeImage" type="text" v-model="formData.assigneeImage">

						<!-- <div class="assignee-image">
							<img v-if="formData.assigneeImage" :src="formData.assigneeImage" alt="Assignee image">
						</div> -->

						<label for="submitDate">Submit Date:</label>
  						<input type="date" id="submitDate" name="submitDate" v-model="formData.submitDate">
					</section>
				</form>
			</div>
		</div>
		
	</section>
</template>

<script> 
	import sanity from '../sanity.js';
	import query from '../groq/dashboard.groq?raw';
	// import query from '../groq/ticketPage.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	export default {
		mixins: [viewMixin],

		data() {
			return {
				editMode: false,
				formData: {
					title:'',
					description: '',
					priority: '',
					status: '',
					progress: 0,
					submitDate: '',
					team: '',
					newTeam: '',
					reporter: '',
					assignee: '',
				},
				teams: [],
				uniqueTeams: [],
				teamID: '',
				reporterID: '',
				assigneeID: '',
			}
		},

		async created() {
			await this.sanityFetch(query, { 
				documentType: 'bug' 
			});

			this.existingteams();
			this.existingUniqueTeams();
		},

		methods: {
			handleSubmit() {		
				const team = {
					_type: 'team',
					name: this.formData.newTeam,
				}
				sanity.create(team).then((res) => {
					this.teamID = res._id;

					const reporter = {
						_type: 'person',
						name: this.formData.reporter,
					}
					sanity.create(reporter).then((res) => {
						this.reporterID = res._id;

						const assignee = {
						_type: 'person',
						name: this.formData.assignee,
						}
						sanity.create(assignee).then((res) => {
							this.assigneeID = res._id;
							this.createBug();
						});
					});
				});			
			},

			createBug() {
				sanity.create({
					_type: 'bug',
					title: this.formData.title,
					description: this.formData.description,
					priority: this.formData.priority,
					status: this.formData.status,
					progress: this.formData.progress,
					submitDate: this.formData.submitDate,
					team: {
						_type: 'reference',
						_ref: this.teamID,
					},
					reporter: {
						_type: 'reference',
						_ref: this.reporterID,
					},
					assignee: {
						_type: 'reference',
						_ref: this.assigneeID,
					}
				})
				
				.then(result => {
					console.log(`Created book with id: ${result._id}`)
					console.log(typeof(this.formData.progress));
				});
			},
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