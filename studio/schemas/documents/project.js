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
            title: 'Team members',
            name: 'teamMembers',
            type: 'reference',
			to: [{ type: 'employee' }],
            description: 'Please enter your team name',
        },
    ]
}