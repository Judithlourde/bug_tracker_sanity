import sanity from './sanity.js';
import query from './groq/bug.groq?raw';
import viewMixin from './mixins/viewMixin.js';
import globalQuery from './groq/global.groq?raw';

export default {
	mixins: [viewMixin],

	state() {
		return {
			globalData: {
				loading: true,
				data: null
			},
			// projects: {
			// 	loading: true,
			// 	data: null
			// },
			uniqueProjects:[],
		};
	},

	getters: {
		isLoading(state) {
			return state.bugs.loading === true;
		},

		bugsData(state) {
			return state.globalData.data.bugs;
		},

		projectsData(state) {
			return state.globalData.data.projects;
		},

		sortedProjects(state) {
			return state.uniqueProjects
		}
	},

	mutations: {
		storeBugsData(state, bugsDataFromSanity) {
			state.globalData.data = bugsDataFromSanity;
			state.globalData.loading = false;
			console.log(state.globalData.data.bugs)
		},

		storeProjectsData(state, projectsDataFromSanity) {
			state.projects.data = projectsDataFromSanity;
			state.projects.loading = true;
			
		},

		filteredProjects(state) {
			
			state.uniqueProjects = [ ...new Set(state.globalData.data.bugs.map(({ project }) => project.name)) ]; 
			console.log(state.uniqueProjects)
			
		}
	},
	
	actions: {
		async fetchAndStoreBugsData({ commit }) {
			const bugsDataFromSanity = await sanity.fetch(globalQuery);
			commit('storeBugsData', bugsDataFromSanity);
			// const projectsDataFromSanity = await sanity.fetch(query, { 
			// 	type: 'project'
			// });
			// commit('storeProjectsData', projectsDataFromSanity);
			commit('filteredProjects')
		},

		async loadBugs() {
			// const resultFromSanity = await this.sanityFetch(query, { 
			// 	documentType: 'bug'
			// });

			// await this.sanityFetchProject(projects, { 
			// 	type: 'project'
			// });

			// console.log(this.result)

			// this.metaTags({
			// 	title: 'Bugs Tracker',
			// })
			// this.filteredProjects();
		},
	}
};
