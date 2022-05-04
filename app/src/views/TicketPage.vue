<template>
	<section>
		<!-- <div v-if="loading">...</div> -->
		<!-- <div v-else class="ticket"> -->
		<div class="ticket">
			<h1 v-if="!editMode">Create a Ticket</h1>
			<h1 v-else>Update your Ticket</h1>

			<div class="ticket__container">
				<form @submit.prevent="handleSubmit">
					<section>
						<label for="title">Title</label>
						<input id="title" name="title" type="text" 	v-model="formData.title"/>

						<label for="description">Description</label> 
                    	<textarea id="description" name="description" rows="3" cols="20" type="text" v-model="formData.description"></textarea>

						<label for="team">Team</label>
						<select id="team" name="team" v-model="formData.team">
							<option v-for="team in teams" :key="team.id" :value="team">{{ team }}</option>
						</select>

						<label for="new-team">New Team</label>
						<input id="new-team" name="team" type="text" v-model="formData.team">

						<label for="priority">Priority</label>
						<select id="priority" name="priority" v-model="formData.priority">
							<option value="major">Major</option>
							<option value="low">Low</option>
							<option value="critical">Critical</option>
						</select>

						<div>
							<label for="progress">Progress</label>
							<input type="range" id="progress" name="progress" v-model="formData.progress" min="0" max="100">
							
							<label for="status">Status</label>
							<select id="status" name="status" v-model="formData.status">
								<option value="not started">Not started yet</option>
								<option value="working on it">Working on it</option>
								<option value="stuck">Stuck</option>
								<option value="done">Done</option>
							</select>
						</div>

						<input type="submit">
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
  						<input type="date" id="submitDate" name="submitDate" v-model="submitDate">
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
					status: 'not started',
					progress: 50,
					// timestamp: new Date().toISOString(),
					submitDate: '',
					team: '',
					value: 10,
				},
				teams:[],
				id: '',
			}
		},

		async created() {
			await this.sanityFetch(query, { 
				documentType: 'bug' 
			});

			this.uniqueTickets();
		},

		methods: {
				handleSubmit() {
					console.log('submitted')
					sanity.create({
						_type: 'bug',
						// _id: 'my id',
						title: this.formData.title,
						description: this.formData.description,
						priority: this.formData.priority,
						status: this.formData.status,
						progress: this.formData.progress,
						submitDate: this.formData.submitDate,
						// team: this.createTeam(this.id),
					}).then((res) => {
  						console.log(`Bike was created, document ID is ${res._id}`)
						this.createTeam(res._id)
					})
					console.log(this.formData.team)

				},

				createTeam(id) {
					const doc = {
						_id: 'id',
						_type: 'team',
						name: 'Sanity Tandem Extraordinaire',
						// seats: 2,
						}

						sanity.createIfNotExists(doc).then((res) => {
						console.log('Bike was created (or was already present)')
					})
				},

				
			

			// createTeam(newTeam) {

			// 	// sjekker om eksistere team
			// 	const teams = sanity.getItem('team');
			// 	const checkExistingTeam = teams.includes(newTeam);
			// 	// hvis eksistere return med en gang
			// 	if(checkExistingTeam) {
			// 		return newTeam;
			// 	} else {
			// 		sanity.create('team', newTeam)
			// 	}
			// 	// hvis ikke eksistere
			// 	// lager vi ny team i referanse felt
			// 	// så returnere vi ny referanse

			// 	return newTeam;
			// },

			

			uniqueTickets() {
				// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
				this.teams = [ ...new Set(this.result.map(({ team }) => team.name)) ];  // Change this.tickets to tickets? after getting data from database
				console.log(this.uniqueTeams)
			},
		}
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