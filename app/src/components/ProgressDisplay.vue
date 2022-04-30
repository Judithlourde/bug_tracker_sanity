<template>
    <div class="progress-display">
        <div class="progress-display__progress-bar">
            <div class="progress-display__progress-bar-indicator" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            progress: { Number }
        }
    }
</script>

<style>
.progress-display {
    min-width: 200px;
}
.progress-display__progress-bar {
    width: 100%;
    height: 30px;
    background-color: #eee;
    border-radius: 15px;
    overflow: hidden;
}

.progress-display__progress-bar-indicator {
    background-color: rgb(151, 77, 220);
    height: 100%;
}
</style>