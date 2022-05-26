<template>
	<section class="bugsboard-section">
		<div :class="{ animationActive: ticketAniamation}">
			<RouterView />
		</div>

        <Navbar/>

		<div v-if="loading">
			<LoadingPage />
		</div>

		<div v-else class="bugsBoard">
			<h1>Bugs Tracker</h1>
			<div class="bugsboard__project-container">
				<div class="test" v-for="(uniqueProject, index) in uniqueProjects" :key="uniqueProject._id">

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
							@get-animate="getAnimation"
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
	import viewMixin from '../mixins/viewMixin.js';
	import TicketCard from '../components/TicketCard.vue';
	import LoadingPage from '../components/LoadingPage.vue';
	import TicketEdit from '../components/TicketEdit.vue'

	export default {
		mixins: [viewMixin],

		components: {
			TicketCard,
            Navbar,
			LoadingPage,
			TicketEdit
		},

		data() {
			return {
				ticketAniamation: false,
				bugAnimation: '',
				results: [],
				uniqueProjects:[],
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
			getAnimation(test) {
				console.log(test)
				this.ticketAniamation = test;
				console.log(this.ticketAniamation)
			},
			async loadBugs() {
				this.$store.dispatch('fetchAndStoreBugsData');
			},

			createBug(uniqueProject, index) {
				this.projectID = this.projects.find(project => project.name === uniqueProject );
				console.log(this.projectID._id)
				sanity.create({
					_type: 'bug',
					title: this.bugData[index],
					slug: {
						_type: 'slug',
						current: this.bugData[index]
										.toLowerCase()
										.replace(/\s+/g, '-')
										.slice(0, 200),
						},
					project: {
						_type: 'reference',
						_ref: this.projectID._id,
					}
				})

				.then(res => {
					this.$store.dispatch('fetchAndStoreBugsData');
					this.bugData[index] = ''
				});
			},
		},
	}

</script>

<style>
	.animationActive .bug-layout {
		background-color: #fff;
		position: absolute;
		top: 0px;
		bottom: 0px;
		right: 0px;
		border-left: 1px solid;
		border-color: #c5c7d0;
		z-index: 1000;
		animation: slideIn .7s ease-in;
	}

	@keyframes slideIn {
		0%{
			transform: skewX(1deg) translateX(500px);
			opacity: 0;
		}
		60%{
			transform: translateX(0px);
			opacity: 1;
		}
		/* 62%{
			transform: translateX(30px);
		}
		70%{
			transform: skew(-10deg);
		}
		80%{
			transform: skew(0deg) translateX(0px);
		}
		90%{
			transform: skew(-5deg);
		} */
		100%{
			transform: skew(0deg);
		}
	}
    .bugsboard-section {
        display: flex;
		height: 100%;
    	width: 100vw;
		/* overflow-x: scroll; */
    }

	.bugsboard {
		padding: 20px;
		width: 100%;
	}

	.bugsboard__project-container {
		width: 100%;
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

	/* small screen devices (968px and below) */
    @media screen and (max-width: 968px) {
		.bugsboard__project-container-title div:nth-child(2),
		.bugsboard__project-container-title div:nth-child(3),
		.bugsboard__project-container-title div:nth-child(4),
		.bugsboard__project-container-title div:nth-child(5),
		.bugsboard__project-container-title div:nth-child(6),
		.bugsboard__project-container-title div:nth-child(7),
		.bugsboard__project-container-title div:nth-child(8),
		.bugsboard__project-container-newBug div:nth-child(2),
		.bugsboard__project-container-newBug div:nth-child(3),
		.bugsboard__project-container-newBug div:nth-child(4),
		.bugsboard__project-container-newBug div:nth-child(5),
		.bugsboard__project-container-newBug div:nth-child(6),
		.bugsboard__project-container-newBug div:nth-child(7),
		.bugsboard__project-container-newBug div:nth-child(8) {
			min-width: 200px;
		}
	}

	.edit input {
		border: none;
	}

	.bugsboard-section {
		overflow-x: scroll;
	}
</style>