<template>
    <div class="loading">
        <p class="loading__title">Loading</p>

        <div class="loading__container">
            <img src="/svg/bugsTracker-logo.svg" alt="bugs tracker logo" class="loading__logo logo1">
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style>
.loading {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
}
.loading__title {
    color: var(--main-color);
    font-size: 4em;
    font-family: var(--main-font);
    padding: 20px;
}
.loading__container {
    display: flex;
    justify-content: center;
}
.loading__logo {
    width: 30px;
    height: 30px;
    position: relative;
    margin:  2% 25% 0% 25%;
    animation: loading 2.5s ease-in-out infinite;
}
.logo1 {
    animation-delay: 0.3s;
}
/* .logo2 {
    animation-delay: 0.6s;
}
.logo3 {
    animation-delay: 0.9s;
} */
@keyframes loading {
   0%, 100%  {
       transform: scale(0.2);
       }
   50%  {
       transform: scale(1);
       }
}

/* 100% {
    transform: rotate(2turn);
} */
</style>