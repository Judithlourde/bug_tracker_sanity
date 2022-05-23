<template>
    <div v-if="priority" class="priority-container" :style="{ backgroundColor: color }">{{ priority }}</div>
    <div v-else></div>
</template>

<script>
    export default {
        props: {
            priority: { String }
        },

        created() {
            this.getColor();
        },

        data() {
            return {
                color: ''
            }
        },

        methods: {
            getColor() {
                switch (this.priority) {
                    case 'critical':
                        this.color = 'rgba(226, 67, 92, 1)'
                        break
                    case 'major':
                        this.color = 'rgba(0, 200, 117, 1)'
                        break
                    case 'low':
                        this.color = 'rgba(255, 203, 0, 1)'
                        break
                    default:
                        this.color = 'rgba(86, 155, 253, 1)'
                }
            }
        }
    }
</script>

<style>
    .priority-container {
        display: flex;
        justify-content: center;
        font-size: 16px;
    }

    .priority-container__stars {
        display: flex;
    }

    .priority-container__stars h3 {
        margin: 7px;
        padding: 0;
    }
</style>