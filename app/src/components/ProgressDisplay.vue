<template>
    <div class="progress-display">
        <div class="progress-display__progress-bar">
            <div v-if="progressDisplay === 'done'" class="progress-display__progress-bar-indicator" :style="{ width: '100%' }"></div>
            <div v-if="progressDisplay === 'working on it'" class="progress-display__progress-bar-indicator" :style="{ width: '60%' }"></div>
            <div v-if="progressDisplay === 'stuck'" class="progress-display__progress-bar-indicator" :style="{ width: '40%' }"></div>
            <div v-if="progressDisplay === 'not started yet'" class="progress-display__progress-bar-indicator" :style="{ width: '10%' }"></div>
            <div v-else></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            progressDisplay: { String }
        }
    }
</script>

<style>
.progress-display {
    min-width: 200px;
}
.progress-display__progress-bar {
    width: 100%;
    height: 20px;
    background-color: #eee;
    border-radius: 15px;
    overflow: hidden;
}

.progress-display__progress-bar-indicator {
    background-color: rgb(151, 77, 220);
    height: 100%;
}
</style>