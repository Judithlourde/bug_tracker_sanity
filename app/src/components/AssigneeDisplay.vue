<template>
    <div class="AssigneeDisplay-container">
        <div class="AssigneeDisplay-container__developer-image">
            <img v-if="assignee" :src="assignee" alt="">
            <img v-else src="/images/employee-placeholder.png" alt="emloyee placeholder image">
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            assignee: { String }
        }
    }
</script>

<style>
    .AssigneeDisplay-container {
        width: 80%;
        display: flex;
        justify-content: center;
    }

    .AssigneeDisplay-container__developer-image {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
    }

    .AssigneeDisplay-container__developer-image img {
        width: 100%;
    }
</style>