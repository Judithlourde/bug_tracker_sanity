<template>
    <section class="priority-container">
        <div class="priority-container__background-color" v-if="priority === 'critical'"  :style="{ backgroundColor: 'rgba(226, 67, 92, 1)' }">
            <div>{{ priority }}</div>
        </div>

        <div class="priority-container__background-color" v-if="priority === 'high'" :style="{ backgroundColor: 'rgba(0, 200, 117, 1)' }">
            <div>{{ priority }}</div>
        </div>

        <div class="priority-container__background-color" v-if="priority === 'low'" :style="{ backgroundColor: 'rgba(255, 203, 0, 1)' }">
            <div>{{ priority }}</div>
        </div>

        <div class="priority-container__background-color" v-if="priority === 'medium'" :style="{ backgroundColor: 'rgba(86, 155, 253, 1)' }">
            <div>{{ priority }}</div>
        </div>
        <div v-else></div>
    </section>
</template>

<script>
    export default {
        props: {
            priority: { String }
        },
    }
</script>

<style>
    .priority-container {
        display: flex;
        justify-content: center;
        font-size: 16px;
    }

    .priority-container__background-color {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    
</style>