import sanity from './sanity.js';
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
			uniqueProjects:[],
			animateSlide: false,
		};
	},

	getters: {
		isLoading(state) {
			return state.globalData.loading === true;
		},

		bugsData(state) {
			return state.globalData.data.bugs;
		},

		projectsData(state) {
			return state.globalData.data.projects;
		},

		sortedProjects(state) {
			return state.uniqueProjects;
		},

		bugStatusColor(state) {
			return state.bug;
		},

		slidePanelAnimate(state) {
			return state.animateSlide;
		}
	},

	mutations: {
		storeBugsData(state, bugsDataFromSanity) {
			state.globalData.data = bugsDataFromSanity;
			state.globalData.loading = false;
		},

		filteredProjects(state) {	
			// Javascript Sets: https://alligator.io/js/sets-introduction/#:~:text=Sets%20are%20a%20new%20object,like%20object%20literals%20or%20arrays.
			state.uniqueProjects = [ ...new Set(state.globalData.data.bugs.map(({ project }) => project.name)) ]; 
			console.log(state.uniqueProjects)
		},

		animateSlidePanel(state) {
			state.animateSlide = !state.animateSlide;
			console.log(state.animateSlide)
		}
	},
	
	actions: {
		async fetchAndStoreBugsData({ commit }) {
			const bugsDataFromSanity = await sanity.fetch(globalQuery);
			commit('storeBugsData', bugsDataFromSanity);
			commit('filteredProjects')
		},

		trueAnimateSlidePanel({commit}) {
			commit('animateSlidePanel');
			
		},
		slideClose({commit}) {
			commit('animateSlidePanel');
		}
	}
}
