<template>
    <section class="status-container">
        <div class="status-container__background-color" v-if="bugStatus === 'done'" :style="{backgroundColor: 'rgba(162, 93, 220, 1)'}">
            <div>{{ bugStatus }}</div>
        </div>

        <div class="status-container__background-color" v-if="bugStatus === 'working on it'" :style="{backgroundColor: 'rgba(0, 200, 117, 1)'}">
            <div>{{ bugStatus }}</div>
        </div>

        <div class="status-container__background-color" v-if="bugStatus === 'stuck'" :style="{backgroundColor: 'rgb(255,203,0)'}">
            <div>{{ bugStatus }}</div>
        </div>
        <div class="status-container__background-color" v-if="bugStatus === 'not started yet'" :style="{backgroundColor: 'rgb(255,203,0)'}">
            <div>{{ bugStatus }}</div>
        </div>
        <div v-else></div>
    </section>
</template>

<script> 
    export default {
        props: {
            bugStatus: { String },
        },

        data() {
            return {
            
            }
        },
    }
</script>

<style>
    .status-container {
        display: flex;
        justify-content: center;
        font-size: var(--body);
    }

    .status-container__background-color {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
    }
</style>