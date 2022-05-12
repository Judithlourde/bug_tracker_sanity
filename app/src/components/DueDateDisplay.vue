<template>
    <div v-if="dueDate" class="dueDateDisplay-container">{{ dueDate }}</div>
    <div v-else></div>
</template>

<script>
    export default {
        props: {
            dueDate: { String }
        }
    }
</script>

<style>
    .dueDateDisplay-container {
        width: 80%;
        display: flex;
        justify-content: center;
        font-size: 16px;
    }
</style>