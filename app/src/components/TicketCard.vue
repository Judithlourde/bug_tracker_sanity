<template>
    <div class="ticketCard">
        <router-link :to="{ name: 'ticket' }">
            <div class="ticketCard__color" :style="{ backgroundColor: color }"></div>
            <div class="ticketCard__title">{{ filteredTicket.title }}</div>
            <TicketOwnerDisplay 
                :ticket-owner = filteredTicket.reporter.image.asset.url
            />
            <StatusDisplay 
                :bug-status = filteredTicket.status 
            />
            <PriorityDisplay 
                :priority = filteredTicket.priority
            />
            <AssigneeDisplay 
                :assignee = filteredTicket.assignee.image.asset.url
            />
            <ProgressDisplay 
                :progress = filteredTicket.progress
            />

        </router-link>

        <DeleteBlock />
    </div>
</template>

<script>
    import TicketOwnerDisplay from './TicketOwnerDisplay.vue'
    import StatusDisplay from './StatusDisplay.vue'
    import PriorityDisplay from './PriorityDisplay.vue'
    import AssigneeDisplay from './AssigneeDisplay.vue'
    import ProgressDisplay from './ProgressDisplay.vue'
    import DeleteBlock from './DeleteBlock.vue'

    export default {
        props: {
            filteredTicket: { Object },
            color: { String }
        },
        components: {
            TicketOwnerDisplay,
            StatusDisplay,
            PriorityDisplay,
            AssigneeDisplay,
            ProgressDisplay,
            DeleteBlock
        },

        
    }
</script>


<style>
    .ticketCard {
        display: flex;
        width: 80vw;
    }

    .ticketCard a h3 {
        /* overflow: scroll; */
    }

    .ticketCard a {
        width: 100%;
        display: flex;
        color: inherit;
        text-decoration: none;  
    }

    .ticketCard a > * {
        background-color: rgb(245, 245, 245);
        margin: 2px;
        padding: 8px;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .ticketCard__title{
        font-size: 16px;
    }

    .ticketCard__color {
        width: 10px !important;
        padding: 5px !important;
        margin: 2px;
    }
</style>