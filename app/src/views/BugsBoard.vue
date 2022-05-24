<template>
	<section class="bugsboard-section">	
        <Navbar/>
		
		<RouterView />
		
		<!-- <div v-if="loading">...</div> -->
		<!-- <div v-else class="dashboard"> -->
		<div class="bugsboard">
			<h1>Bugs Tracker</h1>
			<div class="bugsboard__project-container">
				<div v-for="(uniqueProject, index) in uniqueProjects" :key="uniqueProject._id"> 

					<div class="bugsboard__project-container-title">
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

					<div v-for="bug in bugs.filter(bug => bug.project.name === uniqueProject)" :key="bug._id">
						<TicketCard 
							:filteredBug="bug"
							:color="this.colors[index] || this.colors[0]"
						/>	
					</div>	

					<div class="bugsboard__project-container-newBug">
						<div>
							<div class="ticketCard__color" :style="{ backgroundColor: this.colors[index] || this.colors[0] }"></div>
							
							<div class="edit">
								<input type="text" v-model="bugData[index]" @keyup.enter="createBug(uniqueProject, index)" placeholder="+ Add Bug">
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
			</div>
		</div>
	</section>
</template>

<script>
    import Navbar from '../components/Navbar.vue';
	import sanity from '../sanity.js';
	import query from '../groq/bug.groq?raw';
	import projects from '../groq/project.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';

	export default {
		mixins: [viewMixin],

		components: {
			TicketCard,
            Navbar
		},

		data() {
			return {
				results: [],
				uniqueProjects:[],
				edit: false,
				bugData: [],
				projectID: '',
				colors: [
					'rgba(162, 93, 220, 1)',
					'rgba(0, 200, 117, 1)',
					'rgba(253, 172, 61, 1)',
					'rgba(226, 67, 92, 1)',
					'rgba(86, 155, 253, 1)',
				],
			}
		},

		async created() {
			await this.loadBugs();

			this.metaTags({
				title: 'Bugs Tracker',
			});
			
		},

		computed: {
			loading() {
				return this.$store.getters.isLoading;
			},

			bugs() {
				return this.$store.getters.bugsData;
			},

			projects() {
				return this.$store.getters.projectsData;
			},

			uniqueProjects() {
				return this.$store.getters.sortedProjects;
			},
		},

		methods: {
			async loadBugs() {
				this.$store.dispatch('fetchAndStoreBugsData');
			},

			createBug(uniqueProject, index) {
				this.$store.dispatch('createBug', uniqueProject, index)
			}



			// async loadBugs() {
			// 	await this.sanityFetch(query, { 
			// 		documentType: 'bug'
			// 	});

			// 	await this.sanityFetchProject(projects, { 
			// 		type: 'project'
			// 	});

			// 	console.log(this.result)

			// 	this.metaTags({
			// 		title: 'Bugs Tracker',
			// 	})
			// 	this.filteredProjects();
			// },

			// filteredProjects() {
			// 	// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
			// 	this.uniqueProjects = [ ...new Set(this.result.map(({ project }) => project.name)) ]; 
			// },	

			// createBug(uniqueProject, index) {
			// 	this.projectID = this.projectsResult.find(project => project.name === uniqueProject );
			// 	console.log(this.projectID._id)
			// 	sanity.create({
			// 		_type: 'bug',
			// 		title: this.bugData[index],
			// 		slug: {
			// 			_type: 'slug',
			// 			current: this.bugData[index]
			// 							.toLowerCase()
			// 							.replace(/\s+/g, '-')
			// 							.slice(0, 200),
			// 			},
			// 		project: {
			// 			_type: 'reference',
			// 			_ref: this.projectID._id,
			// 		}
			// 	})
				
			// 	.then(res => {
			// 		console.log(`Created bug with id: ${res._id}`)
			// 		this.loadBugs();
			// 	});
			// },
		},	
	}
	
</script>

<style>
    .bugsboard-section {
        display: flex;	
    }

	.bugsboard {
		padding: 20px;
		width: 100%;
	}

	.bugsboard__project-container {
		width: 100%;
		height: 80vh;
		/* overflow: scroll; */
	}

	.bugsboard__project-container-title,
	.bugsboard__project-container-newBug {
		display: flex;
        width: 90vw;
	}

	.bugsboard__project-container-title div {
		margin: 20px 0 0 0;
	}

	.bugsboard__project-container-title div,
	.bugsboard__project-container-newBug div {
		width: 100%;
		display: flex;
		font-size: 16px;
	}

	.bugsboard__project-container-title div > *,
	.bugsboard__project-container-newBug div > * {
		background-color: rgb(245, 245, 245);
        margin: 1px;
        padding: 5px;
        width: 100%;
        display: flex;
		justify-content: center;
        align-items: center;	
	}

	.bugsboard__project-container-newBug div > * {
		padding: 8px;
	}

	.edit input {
		border: none;
	}
</style>