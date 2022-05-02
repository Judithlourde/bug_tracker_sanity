<template>
    <div class="submitDateDisplay-container">{{ submitDate }}</div>
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