<template>
	<nav class="navigation">
		<div class="navigation__logo-container">
			<router-link :to="{ name:'loginPage' }">
				<img src="/svg/bugsTracker-logo.svg" alt="Logo for the bugs tracker">
			</router-link>
		</div>
	</nav>

</template>

<style>
		
	.navigation {
		/* height: auto; */
		/* width: 20%; */
		background-color: #292F4C;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.navigation__logo-container,
	nav .controls-container {
		padding: 40px 25px;
		display: flex;
		flex-direction: column;
	}

	.navigation__logo-container {
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navigation__logo-container img {
		width: 110%;
	}

	.controls-container div a img {
		width: 20px;
		color: white;
		padding: 5px 0;
	}
</style>