<template>
    <div v-if="bugStatus" class="status-container" :style="{backgroundColor: color}">{{ bugStatus }}</div>
    <div v-else></div>
</template>

<script>
    export default {
        props: {
            bugStatus: { String }
        },

        created() {
            this.getColor()
        },

        data() {
            return {
                status: this.bugStatus,
                color: '',
            }
        },

        methods: {
            getColor() {
                switch (this.status) {
                    case 'done':
                        this.color = 'rgba(162, 93, 220, 1)'
                        break
                    case 'working on it':
                        this.color = 'rgba(0, 200, 117, 1)'
                        break
                    case 'stuck':
                        this.color = 'rgb(255,203,0)'
                        break
                    default:
                        this.color = 'rgba(86, 155, 253, 1)'
                }
            }
        }
    }
</script>

<style>
    .status-container {
        display: flex;
        justify-content: center;
        font-size: 16px;
    }
</style>