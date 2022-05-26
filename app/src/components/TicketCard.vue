<template>
    <section>
        <div class="ticketCard">
            <div>
                <div class="ticketCard__color" :style="{ backgroundColor: color }"></div>
                
                <div class="ticketCard__title">
                    <router-link :to="{ name: 'ticketPage', params: { ticketSlug: filteredBug.slug.current }}">
                        <button @click="changeBugContent(); emitAnimate()">{{ filteredBug.title }} </button>
                    </router-link>
                </div>

                <TicketOwnerDisplay class="ticketCard__reporter"
                    :ticket-owner="filteredBug.reporter"
                />
                
                <StatusDisplay class="ticketCard__status"
                    :bug-status="filteredBug.status"  
                />

                <PriorityDisplay class="ticketCard__priority"
                    :priority="filteredBug.priority"
                />

                <AssigneeDisplay class="ticketCard__assignee"
                    :assignee="filteredBug.assignee"
                />

                <ProgressDisplay class="ticketCard__progress"
                    :progress-display="filteredBug.status"
                />

                <DueDateDisplay class="ticketCard__dueDate"
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
                testAnimate: true,
            }
        },

        methods: {
            changeBugContent() {
                this.$router.push('/bugsBoard/bug')
            },

            emitAnimate() {
                this.$emit('get-animate', this.testAnimate)
            }
        }
    }
</script>


<style>
    .ticketCard {
        display: flex;
        width: 90vw;
    }

    .ticketCard:hover {
        background-color: #e6e9ef;
    }

    .ticketCard > div:hover {
        margin: 2px 1px;
        background-color: #e6e9ef;
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
        /* width: 100%;       */
    }

    .ticketCard__color {
        width: 10px !important;
        padding: 5px !important;
        margin: 2px;
    }

    /* .ticketCard__title:hover {
        background-color: #e6e9ef;
        cursor: pointer;
    } */

    /* Small screen devices (968px and below) */
    @media screen and (max-width: 968px) {
        .ticketCard__title,
        .ticketCard__reporter,
        .ticketCard__status,
        .ticketCard__priority,
        .ticketCard__assignee,
        .ticketCard__progress,
        .ticketCard__dueDate {
            min-width: 200px;
        }
    }
</style>