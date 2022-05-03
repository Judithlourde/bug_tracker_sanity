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
						<input 
							id="title" 
							name="title" 
							type="text" 
							
							v-model="formData.title"
						/>

						<!-- @keyup.enter="handleChange" -->

						<label for="description">Description</label>
						<input 
							id="description" 
							name="description" 
							type="text" 
							
							v-model="formData.description"
						/>

						<label for="team">Team</label>
						<select 
							id="team"
							name="team" 
							v-model="formData.team"
								
						>
							<!-- <div v-for="team in teams" :key="team.id"> -->
								<option v-for="team in teams" :key="team.id" value="team">{{ team }}</option>
							<!-- </div> -->
						</select>

						<label for="new-team">New Team</label>
						<input 
							id="new-team" 
							name="team" 
							type="text" 
							 
							v-model="formData.team"
						>

						<label for="priority">Priority</label>
						<div class="ticket__container-multiple-input-container">
							<input 
								id="priority-1"
								name="priority"
								type="radio"
								
								:value=1
								v-model="formData.priority"
							> 
							<label for="priority-1">1</label>

								<input 
								id="priority-2"
								name="priority"
								type="radio"
								
								:value=2
								v-model="formData.priority"
							> 
							<label for="priority-2">2</label>

								<input 
								id="priority-3"
								name="priority"
								type="radio"
								
								:value=3
								v-model="formData.priority"
							> 
							<label for="priority-3">3</label>

								<input 
								id="priority-4"
								name="priority"
								type="radio"
								
								:value=4
								v-model="formData.priority"
							> 
							<label for="priority-4">4</label>

								<input 
								id="priority-5"
								name="priority"
								type="radio"
								
								:value=5
								v-model="formData.priority"
							> 
							<label for="priority-5">5</label>
						</div>

						<!-- <div v-if="editMode"> -->
						<div>
							<label for="progress">Progress</label>
							<input 
								type="range"
								id="progress"
								name="progress"
								:value="formData.progress"
								min=0
								max=100
							>
							
							<label for="status">Status</label>
							<select 
								id="status"
								name="status" 
								
								v-model="formData.status"
							
							>
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
						<input 
							id="reporter" 
							name="reporter" 
							type="text" 
							 
							v-model="formData.reporter"
						>

						<label for="reporterImage">Reporter Image</label>
						<input 
							id="reporterImage" 
							name="reporterImage" 
							type="text" 
							 
							v-model="formData.reporterImage"
						>

						<div class="reporter-image">
							<img v-if="formData.reporterImage" :src="formData.reporterImage" alt="Reporter image">
						</div>

						<label for="assignee">Assignee</label>
						<input 
							id="assignee" 
							name="assignee" 
							type="text" 
							 
							v-model="formData.assignee"
						>

						<label for="assigneeImage">Assignee Image</label>
						<input 
							id="assigneeImage" 
							name="assigneeImage" 
							type="text" 
							 
							v-model="formData.assigneeImage"
						>

						<div class="assignee-image">
							<img v-if="formData.assigneeImage" :src="formData.assigneeImage" alt="Assignee image">
						</div>
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
					priority: 0,
					status: 'not started',
					progress: 0,
					timestamp: new Date().toISOString(),
					team: '',
				},
				teams:[]
			}
		},

		// async created() {
		// 	await this.sanityFetch(query, { 
		// 		slug: this.$route.params.projectSlug
		// 	});

		// 	this.metaTags({
		// 		title: this.result.title,
		// 		description: this.result.description,
		// 		image: this.result.documentation[0].asset.url
		// 	});
		// },

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
					title: this.formData.title,
					description: this.formData.description,
					priority: this.formData.priority,
					status: this.formData.status,
					progress: this.formData.progress,
					submitDate: this.formData.timestamp,
					team: this.formData.team,

				});
			},

			handleChange() {
				console.log(this.formData.title)
				console.log(this.formData.description)
				console.log(this.formData.timestamp)
				console.log(this.formData.status)
				console.log(this.formData.category)
				console.log(this.formData.priority)
			},

			uniqueTickets() {
				// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
				this.teams = [ ...new Set(this.result.map(({ team }) => team.name)) ];  // Change this.tickets to tickets? after getting data from database
				console.log(this.uniqueTeams)
			},

			// patchProject() {
			// 	/* bare hvis withCredentials: true! */

			// 	sanity
			// 		.patch('a99b7992-0974-4a7e-8ddb-6891f7a6776a')
			// 		.set({ year: 2022 })
			// 		.commit()
			// 		.then(updatedDocument => {
			// 			console.log('I just updated document:', updatedDocument);
			// 		});
			// },

			// createProject() {
			// 	/* bare hvis withCredentials: true! */

			// 	sanity.create({
			// 		_type: 'project',
			// 		title: 'NEW PROJECT!!!',
			// 	});
			// },
			
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