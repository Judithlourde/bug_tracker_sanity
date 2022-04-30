export default {
    title: 'Person',
    name: 'person',
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
        }
    ]
}