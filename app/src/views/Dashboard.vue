<template>
	<section>
		<div v-if="loading">...</div>
		<div v-else class="dashboard">
			<h1>Bugs Tracker</h1>
			<div class="dashboard__project-container">
				<div v-for="(uniqueProject, index) in uniqueProjects" :key="uniqueProject.id"> 

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

					<div v-for="bug in result.filter(bug => bug.project.name === uniqueProject)" :key="bug.id">
						<TicketCard 
							:filteredBug="bug"
							:color="this.colors[index] || this.colors[0]"
						/>	
					</div>	

					<div class="dashboard__project-container-newBug">
						<div>
							<div class="ticketCard__color" :style="{ backgroundColor: this.colors[index] || this.colors[0] }"></div>
							
							<div>
								<div class="edit">
									<div v-if="!edit" @click="addNewBug()">+ Add bug</div>
									
									<div v-else>
										<input type="text" v-model="formData.title" @keyup.enter="createBug(uniqueProject)" placeholder="+ Add Bug">
										<div>Add</div>
									</div>
								</div>
							</div>
							<div>Reporter</div> 
							<div>Status</div>	
							<div>Priority</div>
							<div>Assignee</div>

							<div class="progress-display">
								<div>
            						<div></div>
        						</div>
							</div>
							
							<div>Due Date</div>
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
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';
	// import TicketPage from '../views/TicketPage.vue';
	export default {
		mixins: [viewMixin],
		data() {
			return {
				uniqueProjects:[],
				edit: false,
				formData: {
					title:'',
					description: '',
					priority: '',
					status: '',
					progress: 0,
					submitDate: '',
					team: '',
					reporter: '',
					assignee: '',
				},
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

			this.metaTags({
				title: 'Bugs Tracker',
			})
			this.projects();
		},
		
		components: {
			TicketCard,
		},

		methods: {
			projects() {
				// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
				this.uniqueProjects = [ ...new Set(this.result.map(({ project }) => project.name)) ]; 
				console.log(this.uniqueProjects)
			},	

			addNewBug() {
				this.edit = !this.edit;
			},

			createBug(uniqueProject) {
				consolo.log(uniqueProject)
				this.projectID = this.result.find(project => project.name === uniqueProject );
				const project = {
						_id: this.projectID._id,
						_type: 'project',
						name: uniqueProject,
					}
				sanity.createIfNotExists(project).then((res) => {
					this.projectID = res._id;
					this.test();
				});
			},

			test() {
				sanity.create({
					_type: 'bug',
					title: this.formData.title,
					project: {
						_type: 'reference',
						_ref: this.projectID._id,
					}
				})
				
				.then(result => {
					console.log(`Created book with id: ${result._id}`)
				});
			}
		
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
</style>