import sanityClient from '@sanity/client';

export default sanityClient({
	projectId: '77fjjy5l',
	dataset: 'production',
	apiVersion: '2022-04-29', //dagen prosjektet ble først opprettet/sist oppdatert
	useCdn: false, //false for localhost, true for netlify
	withCredentials: true
});