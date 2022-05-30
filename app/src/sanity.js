import sanityClient from '@sanity/client'

// To get write and data in Sanity
export default sanityClient({
	projectId: '77fjjy5l',
	dataset: "production",
	apiVersion: '2022-04-29',	// Project started date or updated date
	token: import.meta.env.VITE_BUG_KEY,
	useCdn: false,	//false for localhost, true for netlify
});