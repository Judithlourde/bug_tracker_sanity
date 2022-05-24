<template>
    <section>
        <div class="ticketCard">
            <div>
                <div class="ticketCard__color" :style="{ backgroundColor: color }"></div>
                
                <div class="ticketCard__title">
                    <router-link :to="{ name: 'ticketPage', params: { ticketSlug: filteredBug.slug.current }}">
                        <button @click="changeBugContent">{{ filteredBug.title }} </button>
                    </router-link>
                </div>

                <TicketOwnerDisplay 
                    :ticket-owner="filteredBug.reporter"
                />
                
                <StatusDisplay 
                    :bug-status="filteredBug.status"  
                />

                <PriorityDisplay 
                    :priority="filteredBug.priority"
                />

                <AssigneeDisplay 
                    :assignee="filteredBug.assignee"
                />

                <ProgressDisplay 
                    :progress-display="filteredBug.status"
                />

                <DueDateDisplay
                    :due-date="filteredBug.dueDate"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import TicketOwnerDisplay from './TicketOwnerDisplay.vue'
    import StatusDisplay from './StatusDisplay.vue'
    import PriorityDisplay from './PriorityDisplay.vue'
    import AssigneeDisplay from './AssigneeDisplay.vue'
    import ProgressDisplay from './ProgressDisplay.vue'
    import DueDateDisplay from './DueDateDisplay.vue'
    import TicketEdit from './TicketEdit.vue'

    export default {
        props: {
            filteredBug: { Object },
            color: { String }
        },

        components: {
            TicketOwnerDisplay,
            StatusDisplay,
            PriorityDisplay,
            AssigneeDisplay,
            ProgressDisplay,
            DueDateDisplay,
            TicketEdit
        },  

        data() {
            return {
            }
        },

        methods: {
            changeBugContent() {
                this.$router.push('/bugsBoard/bug')
            }
        }
    }
</script>


<style>
    .ticketCard {
        display: flex;
        width: 90vw;
    }

    .ticketCard a h3 {
        /* overflow: scroll; */
    }

    .ticketCard > div {
        width: 100%;
        display: flex;
    }

    .ticketCard > div > * {
        background-color: rgb(245, 245, 245);
        margin: 1px;
        padding: 4px;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .ticketCard__title {
        font-size: 16px;
        color: inherit;
        text-decoration: none;       
    }

    .ticketCard__color {
        width: 10px !important;
        padding: 5px !important;
        margin: 2px;
    }
</style>