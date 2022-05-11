export default {
    title: 'Project',
    name: 'project',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Please enter your project name',
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100
            }
        },
        {
            title: 'Project members',
            name: 'projectMembers',
            type: 'array',
            of: [
                    {
                    type: 'reference',
                    to: [{ type: 'employee' }]
                    },
			],
            description: 'Please select your project members',
        },
    ]
}