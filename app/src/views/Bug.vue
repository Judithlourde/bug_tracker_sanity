<template>
    <section class="bug-layout">
        <RouterView />
    </section>
</template>

<script>
</script>

<style>
    .bug-layout {
        transform: translateX(0);
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        max-width: 500px;
        height: 100%;
        width: 100%;
        background-color: #fff;
    }

    .slide-side-enter-from
	{
		opacity: 0;
        transform: translateY(-250px);
	}

	.slide-side-leave-to {
		opacity: 1;
        transform: translateY(0);
	}

	.slide-side-enter-active {
		animation: slide 3s ease-in;
	}

	.slide-side-leave-active {
		animation: slide 3s ease-out;
	}
</style>