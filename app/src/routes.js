import Dashboard from './views/Dashboard.vue';
import TicketPage from './views/TicketPage.vue';

export default [
	// { 
	// 	name: 'projectPage', 
	// 	path: '/:projectSlug',
	// 	component: ProjectPage 
	// },
	
	{ 
		name: 'ticketID', 
		path: '/ticket/:ticketID',
		component: TicketPage 
	},
	{ 
		name: 'ticket', 
		path: '/ticket',
		component: TicketPage 
	},
	{ 
		name: 'dashboard', 
		path: '/', 
		component: Dashboard 
	},
];
