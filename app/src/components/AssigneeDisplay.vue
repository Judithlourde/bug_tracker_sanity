<template>
    <div class="assigneeDisplay-container">
        <div class="assigneeDisplay-container__developer-image">
            <img v-if="assignee" :src="assignee.image.asset.url" :alt="assignee.image.caption">
            <img v-else src="/images/employee-placeholder.png" alt="emloyee placeholder image">
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            assignee: { Object }
        }
    }
</script>

<style>
    .assigneeDisplay-container {
        width: 80%;
        display: flex;
        justify-content: center;
    }

    .assigneeDisplay-container__developer-image {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
    }

    .assigneeDisplay-container__developer-image img {
        width: 100%;
    }
</style>