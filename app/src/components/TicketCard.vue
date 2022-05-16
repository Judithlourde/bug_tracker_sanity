<template>
    <div class="ticketCard">
        <div>
            <div class="ticketCard__color" :style="{ backgroundColor: color }"></div>
            <router-link class="ticketCard__title"  :to="{ name: 'ticketPage', params: { ticketSlug: filteredBug.slug.current }}">{{ filteredBug.title }}</router-link>

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
                :progress-display="progress"
            />

            <DueDateDisplay
                :due-date="filteredBug.dueDate"
            />
        </div>
        <!-- <DeleteBlock /> -->
    </div>
</template>

<script>
    import TicketOwnerDisplay from './TicketOwnerDisplay.vue'
    import StatusDisplay from './StatusDisplay.vue'
    import PriorityDisplay from './PriorityDisplay.vue'
    import AssigneeDisplay from './AssigneeDisplay.vue'
    import ProgressDisplay from './ProgressDisplay.vue'
    import DueDateDisplay from './DueDateDisplay.vue'
    // import DeleteBlock from './DeleteBlock.vue'

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
            // DeleteBlock
        },  

        created() {
            this.getProgress()
        },

        data() {
            return {
                bugProgress: this.filteredBug.status,
                progress: 0,
            }
        },
        
        methods: {
            getProgress() {
                console.log(this.filteredBug.status);
                switch (this.bugProgress) {
                    case 'done':
                        this.progress = 100;
                        break

                    case 'working on it':
                        this.progress = 60;
                        break

                    case 'stuck':
                        this.progress = 40;
                        break

                    default:
                        this.progress = 10;
                }
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