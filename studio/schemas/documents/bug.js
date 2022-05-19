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
				slugify: input => input
									.toLowerCase()
									.replace(/\s+/g, '-')
									.slice(0, 200)
			}
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text'
		},
		{
			title: 'Screenshot',
			name: 'screenshot',
			type: 'image',
		},
		{
			title: 'Reporter',
			name: 'reporter',
			type: 'reference',
			to: [{ type: 'employee' }]
		},
		{
			title: 'Assignee',
			name: 'assignee',
			type: 'reference',
			to: [{ type: 'employee' }]
		},
		{
            
            title: 'Priority',
            name: 'priority',
            type: 'string',
            options: {
                list: [
                    {title: 'High', value: 'high'},
					{title: 'Medium', value: 'medium'},           
                    {title: 'Low', value: 'low'},
                    {title: 'Critical', value: 'critical'},
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required()
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
			title: 'Due Date',
			name: 'dueDate',
			type: 'date'
		},
		{
			title: 'Project',
			name: 'project',
			type: 'reference',
			to: [{ type: 'project' }]
		},
	]
}