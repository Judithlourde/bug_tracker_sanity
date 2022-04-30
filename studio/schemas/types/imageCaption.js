export default {
	title: 'Image caption',
	name: 'imageCaption',
	type: 'image',
	fields: [
		{
			title: 'Caption',
			name: 'caption',
			type: 'text',
			options: {
				isHighlighted: true
			}
		}
	],
	options: {
		hotspot: true,		// It helps to edit the image
	}
}