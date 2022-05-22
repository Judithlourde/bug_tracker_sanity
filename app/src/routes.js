import TicketPage from './views/TicketPage.vue';
import Bug from './views/Bug.vue';
import BugsBoard from './views/BugsBoard.vue';
import LoginPage from './views/LoginPage.vue';

export default [
	{ 
		name: 'bugsBoard', 
		path: '/bugsBoard',
		component: BugsBoard, 
		children: [
			{
				name: 'bug', 
				path: 'bug',
				component: Bug,
				children: [
					{
						name: 'ticketPage', 
						path: ':ticketSlug',
						component: TicketPage
					}
				]
			},
			
		]
	},
	{ 
		name: 'loginPage', 
		path: '/',
		component: LoginPage 
	},
];
