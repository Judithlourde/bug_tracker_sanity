<template>
    <div class="priority-container">
        <div class="priority-container__stars">
            <!-- Set the stars count depending upon the priority cont -->
            <h3 v-if="priority >=1" :style="{ color: 'rgba(162, 93, 220, 1)' }">☆</h3>
            <h3 v-if="priority >=2" :style="{ color: 'rgba(162, 93, 220, 1)' }">☆</h3>
            <h3 v-if="priority >=3" :style="{ color: 'rgba(162, 93, 220, 1)' }">☆</h3>
            <h3 v-if="priority >=4" :style="{ color: 'rgba(162, 93, 220, 1)' }">☆</h3>
            <h3 v-if="priority >=5" :style="{ color: 'rgba(162, 93, 220, 1)' }">☆</h3>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            priority: { Number }
        }
    }
</script>

<style>
    .priority-container {
        display: flex;
        justify-content: center;
    }

    .priority-container__stars {
        display: flex;
    }

    .priority-container__stars h3 {
        margin: 7px;
        padding: 0;
    }
</style>