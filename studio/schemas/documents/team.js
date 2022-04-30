export default {
    title: 'Team',
    name: 'team',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Please enter your team name',
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
			to: [{ type: 'person' }],
            description: 'Please enter your team name',
        },
    ]
}