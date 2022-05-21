<template>
    <TicketEdit 
		:test="value"
	/>
</template>

<script>
    import TicketEdit from '../components/TicketEdit.vue'
    export default {
        components: {
            TicketEdit
        },
		
		data() {
			return {
				value: true
			}
		}
    }
</script>