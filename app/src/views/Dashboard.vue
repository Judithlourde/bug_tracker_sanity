<template>
	<section>
		<div v-if="loading">...</div>
		<div v-else class="dashboard">
			<h1>Bugs Tracker</h1>
			<div class="dashboard__project-container">
				<div v-for="(uniqueProject, index) in uniqueProjects" :key="uniqueProject.id"> 
					<!-- {{ uniqueTeam }}  -->

					<div class="dashboard__project-container-title">
						<div :style="{ color: this.colors[index] || this.colors[0] }">{{ uniqueProject }}</div>
						<div>Reporter</div> 
						<div>Status</div>	
						<div>Priority</div>
						<div>Assignee</div>
						<div>Progress </div>
						<div>Due Date</div>
					</div>

					<div v-for="bug in result.filter(bug => bug.project.name === uniqueProject)" :key="bug.id">
						<TicketCard 
							:filteredBug="bug"
							:color="this.colors[index] || this.colors[0]"
						/>	
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
	import query from '../groq/dashboard.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';
	// import TicketPage from '../views/TicketPage.vue';
	export default {
		mixins: [viewMixin],
		data() {
			return {
				uniqueProjects:[],
				// filteredTickets:[],
				colors:[
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
			
		},	
	}
	
</script>

<style>
	.dashboard {
		padding: 30px;
		width: 100%;
	}

	.dashboard__project-container {
		width: 100%;
		height: 80vh;
		/* overflow: scroll; */
	}

	.dashboard__project-container-title {
		width: 88vw;
		display: flex;
		font-size: 16px;
		margin: 20px 0 0 0;
	}

	.dashboard__project-container-title > * {
        margin: 2px;
        padding: 5px 0 0 20px ;
        width: 100%;
        display: flex;
        align-items: center;
		
	}

</style>