<template>
	<nav class="navigation">
		<div class="logo-container">
			<router-link :to="{ name:'dashboard' }">
				<img src="/svg/bugsTracker-logo.svg" alt="Logo for the friday.com">
			</router-link>
		</div>
		
		<div class="controls-container">
			<div class="icon" >
				<router-link :to="{ name:'ticket' }">
					<img src="/svg/plus-icon.svg" alt="plus icon for make tickets">
				</router-link>
			</div>
		</div>
	</nav>

</template>

<style>
	.navigation {
		height: 100vh;
		/* width: 40%; */
		background-color: #292F4C;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	nav .logo-container,
	nav .controls-container {
		padding: 40px 25px;
		display: flex;
		flex-direction: column;
	}

	.logo-container {
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo-container img {
		width: 110%;
	}

	.controls-container div a img {
		width: 20px;
		color: white;
		padding: 5px 0;
	}
</style>