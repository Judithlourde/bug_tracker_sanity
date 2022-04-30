<template>
    <div class="AssigneeDisplay-container">
        <div class="AssigneeDisplay-container__developer-image">
            <!-- <img v-if="" :src="" alt=""> -->
            <!-- <img v-else src="" alt=""> -->
        </div>
        
    </div>
</template>

<script>
    export default {
        // props: {
        //     {assignee:  String }
        // }
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