// import sanityClient from '@sanity/client';

// export default sanityClient({
// 	projectId: '77fjjy5l',
// 	dataset: 'production',
// 	apiVersion: '2022-04-29', //dagen prosjektet ble først opprettet/sist oppdatert
// 	useCdn: true, //false for localhost, true for netlify
// 	withCredentials: true,
// 	token: process.env.VITE_BUG_KEY,	
// });

import sanityClient from '@sanity/client'

// To write data in Sanity
export default sanityClient({
	projectId: '77fjjy5l',
	dataset: "production",
	apiVersion: '2022-04-29',
	token: import.meta.env.VITE_BUG_KEY,
	useCdn: false,
});