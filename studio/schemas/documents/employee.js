export default {
    title: 'Employee',
    name: 'employee',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Please use "Firstname Lastname" format',
        },
        {
            title: 'Slug',
            name: 'person',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100
            }
        },
        {
            title: 'Role',
            name: 'role',
            type: 'string',
            description: 'Please enter your role',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'imageCaption',
        },
        {
			title: 'Team',
			name: 'team',
			type: 'reference',
    		to: [{ type: 'team' }]
		},
    ]
}