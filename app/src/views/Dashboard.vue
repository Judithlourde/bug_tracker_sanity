<template>
	<section>
		<div v-if="loading">...</div>
		<div v-else class="dashboard">
			<h1>Bugs Tracker</h1>
			<div class="dashboard__ticket-container">
				<div v-for="(uniqueTeam, index) in uniqueTeams" :key="uniqueTeam.id"> 
					<!-- {{ uniqueTeam }}  -->

					<div class="dashboard__ticket-container-title">
						<div :style="{ color: this.colors[index] || this.colors[0] }">{{ uniqueTeam }}</div>
						<div>Reporter</div> 
						<div>Status</div>	
						<div>Priority</div>
						<div>Assignee</div>
						<div>Progress </div>
						<div>SubmitDate</div>
					</div>

					<div v-for="bug in result.filter(bug => bug.team.name === uniqueTeam)" :key="bug.id">
						<TicketCard 
							:filteredTicket="bug"
							:color="this.colors[index] || this.colors[0]"
						/>	
					</div>	
				</div>

				<TicketPage 
					:teams="this.uniqueTeams"
				/>
			</div>
		</div>
	</section>
</template>

<script>
	import query from '../groq/dashboard.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';
	import TicketPage from '../views/TicketPage.vue';
	export default {
		mixins: [viewMixin],
		data() {
			return {
				uniqueTeams:[],
				filteredTickets:[],
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
			this.uniqueTickets();
		},
		
		components: {
			TicketCard,
		},

		computed: {
			answer() {
				console.log(this.category);
			}
			
		},

		methods: {
			uniqueTickets() {
				// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
				this.uniqueTeams = [ ...new Set(this.result.map(({ team }) => team.name)) ];  // Change this.tickets to tickets? after getting data from database
				console.log(this.uniqueTeams)
			},
			
		},	
	}
	
</script>

<style>
	.dashboard {
		padding: 30px;
		width: 100%;
	}

	.dashboard__ticket-container {
		width: 100%;
		height: 80vh;
		/* overflow: scroll; */
	}

	.dashboard__ticket-container-title {
		width: 88vw;
		display: flex;
		font-size: 16px;
		margin: 20px 0 0 0;
	}

	.dashboard__ticket-container-title > * {
        margin: 2px;
        padding: 5px;
        width: 100%;
        display: flex;
        align-items: center;
	}

</style>