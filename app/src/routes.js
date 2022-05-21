import TicketPage from './views/TicketPage.vue';

export default [
	{ 
		name: 'ticketPage', 
		path: '/:ticketSlug',
		component: TicketPage 
	},
];
