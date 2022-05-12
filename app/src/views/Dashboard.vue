<template>
	<section>
		<div v-if="loading">...</div>
		<div v-else class="dashboard">
			<h1>Bugs Tracker</h1>
			<div class="dashboard__project-container">
				<div v-for="(uniqueProject, index) in uniqueProjects" :key="uniqueProject._id"> 

					<div class="dashboard__project-container-title">
						<div>
							<div class="ticketCard__color" :style="{ backgroundColor: this.colors[index] || this.colors[0] }"></div>
							<div :style="{ color: this.colors[index] || this.colors[0] }">{{ uniqueProject }}</div>
							<div>Reporter</div> 
							<div>Status</div>	
							<div>Priority</div>
							<div>Assignee</div>

							<div class="progress-display">
								<div>
									<div>Progress</div>
								</div>
							</div>

							<div>Due Date</div>
						</div>	
					</div>

					<div v-for="bug in result.filter(bug => bug.project.name === uniqueProject)" :key="bug._id">
						<TicketCard 
							:filteredBug="bug"
							:color="this.colors[index] || this.colors[0]"
						/>	
					</div>	

					<div class="dashboard__project-container-newBug">
						<div>
							<div class="ticketCard__color" :style="{ backgroundColor: this.colors[index] || this.colors[0] }"></div>
							
							<div class="edit">
								<!-- <div v-if="!edit" @click="addNewBug(uniqueProject)">+ Add bug</div>

								<div v-else> -->
									<input type="text" v-model="formData[index]" @keyup.enter="createBug(uniqueProject, index)" placeholder="+ Add Bug">
									<!-- <div @click="createBug(uniqueProject, index)">Add</div> -->
								<!-- </div> -->
							</div>
							
							<div></div> 
							<div></div>	
							<div></div>
							<div></div>

							<div class="progress-display">
								<div>
            						<div></div>
        						</div>
							</div>
							
							<div></div>
						</div>
					</div>
				</div> 

				<!-- <TicketPage 
					:projects="this.uniqueProjects"
				/> -->
			</div>
		</div>
	</section>
</template>

<script>
	import sanity from '../sanity.js';
	import query from '../groq/dashboard.groq?raw';
	import projects from '../groq/project.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';
	// import TicketPage from '../views/TicketPage.vue';
	export default {
		mixins: [viewMixin],
		data() {
			return {
				uniqueProjects:[],
				edit: false,
				formData: [],
				// formData: {
				// 	title:'',
				// },
				projectID: '',
				// filteredTickets:[],
				colors: [
					'rgba(162, 93, 220, 1)',
					'rgba(0, 200, 117, 1)',
					'rgba(253, 172, 61, 1)',
					'rgba(226, 67, 92, 1)',
					'rgba(86, 155, 253, 1)',
				]
			}
		},

		async created() {
			await this.sanityFetch(query, { 
				documentType: 'bug'
			});

			await this.sanityFetchProject(projects, { 
				type: 'project'
			});

			console.log(this.result)

			this.metaTags({
				title: 'Bugs Tracker',
			})
			this.filteredProjects();
		},

		// watch: {
		// 	filteredProjects();
		// },
		
		components: {
			TicketCard,
		},

		computed: {
			
		},

		methods: {
			filteredProjects() {
				// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
				this.uniqueProjects = [ ...new Set(this.result.map(({ project }) => project.name)) ]; 
				console.log(this.uniqueProjects)
			},	

			addNewBug(uniqueProject) {
				this.edit = !this.edit;
			},

			createBug(uniqueProject, index) {
				this.projectID = this.projectsResult.find(project => project.name === uniqueProject );
				console.log(this.projectID._id)
				sanity.create({
					_type: 'bug',
					title: this.formData[index],
					project: {
						_type: 'reference',
						_ref: this.projectID._id,
					}
				})
				
				.then(res => {
					console.log(`Created book with id: ${res._id}`)
				});
			},
		},	
	}
	
</script>

<style>
	.dashboard {
		padding: 20px;
		width: 100%;
	}

	.dashboard__project-container {
		width: 100%;
		height: 80vh;
		/* overflow: scroll; */
	}

	.dashboard__project-container-title,
	.dashboard__project-container-newBug {
		display: flex;
        width: 90vw;
	}

	.dashboard__project-container-title div {
		margin: 20px 0 0 0;
	}

	.dashboard__project-container-title div,
	.dashboard__project-container-newBug div {
		width: 100%;
		display: flex;
		font-size: 16px;
	}

	.dashboard__project-container-title div > *,
	.dashboard__project-container-newBug div > * {
		background-color: rgb(245, 245, 245);
        margin: 1px;
        padding: 5px;
        width: 100%;
        display: flex;
		justify-content: center;
        align-items: center;	
	}

	.dashboard__project-container-newBug div > * {
		padding: 8px;
	}

	.edit input {
		border: none;
	}
</style>