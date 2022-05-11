import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

/* documents */
import bug from './documents/bug.js'
import team from './documents/team.js'
import employee from './documents/employee.js'
import project from './documents/project.js'

/* types */
import imageCaption from './types/imageCaption.js'


export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		bug,
		team,
		employee,
		project,	
		imageCaption,	
	]),
})
