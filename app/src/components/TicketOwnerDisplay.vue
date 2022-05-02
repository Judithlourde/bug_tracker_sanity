<template>
    <div class="TicketOwnerDisplay-container">
        <div class="TicketOwnerDisplay-container__developer-image">
            <img v-if="ticketOwner" :src="ticketOwner" alt="">
            <img v-else src="/images/employee-placeholder.png" alt="emloyee placeholder image">
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            ticketOwner: { String }
        }
    }
</script>

<style>
    .TicketOwnerDisplay-container {
        width: 80%;
        display: flex;
        justify-content: center;
    }

    .TicketOwnerDisplay-container__developer-image {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
    }

    .TicketOwnerDisplay-container__developer-image img {
        width: 100%;
    }
</style>