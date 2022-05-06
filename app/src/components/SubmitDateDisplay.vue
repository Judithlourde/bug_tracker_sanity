<template>
    <div v-if="submitDate" class="submitDateDisplay-container">{{ submitDate }}
        <div v-if="!submitDate">Date</div>
    </div>
</template>

<script>
    export default {
        props: {
            submitDate: { String }
        }
    }
</script>

<style>
    .submitDateDisplay-container {
        width: 80%;
        display: flex;
        justify-content: center;
        font-size: 16px;
    }
</style>