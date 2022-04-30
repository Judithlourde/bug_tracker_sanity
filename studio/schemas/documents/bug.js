export default {
	title: 'Bug',
	name: 'bug',	//_type: "bug"
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 100
			}
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text'
		},
		{
			title: 'Team',
			name: 'team',
			type: 'reference',
    		to: [{ type: 'team' }]
		},
		{
			title: 'Reporter',
			name: 'reporter',
			type: 'reference',
			to: [{ type: 'person' }]
		},
		{
			title: 'Assignee',
			name: 'assignee',
			type: 'reference',
			to: [{ type: 'person' }]
		},
		{
			title: 'Priority',
			name: 'priority',
			type: 'number'
		},
		{
            
            title: 'Status',
            name: 'status',
            type: 'string',
            options: {
                list: [
                    {title: 'Not started yet', value: 'not stated yet'},           
                    {title: 'Working on it', value: 'working on it'},
                    {title: 'Stuck', value: 'stuck'},
					{title: 'Done', value: 'Done'},
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required()
        },
		{
			title: 'Progress',
			name: 'progress',
			type: 'number'
		},
		{
			title: 'Submit Date',
			name: 'submitDate',
			type: 'date'
		},
	]
}