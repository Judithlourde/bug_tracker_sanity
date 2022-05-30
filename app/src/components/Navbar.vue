<template>
	<nav role="navigation" class="navigation">
		<div class="navigation__logo-container">
			<figure>
				<img src="/svg/bugsTracker-logo.svg" alt="Logo for the bugs tracker">
				<figcaption>Bugs Tracker</figcaption>
			</figure>

			<router-link :to="{ name:'loginPage' }">
				<img src="/svg/person.svg" alt="image for the login page">
				<!-- <img src="/svg/bugsTracker-logo.svg" alt="Logo for the bugs tracker"> -->
			</router-link>
		</div>
	</nav>

</template>

<style>
	/* Small screen devices (968px and below) */
    @media screen and (max-width: 968px) {
		.navigation {
			width: 17%;
		}
	}
		
	.navigation {
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
		width: 75px;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.navigation__logo-container figure img {
		width: 80%;
		padding-bottom: 5px;
	}

	.navigation__logo-container figure figcaption {
		font-size: 12px;
	}

	.navigation__logo-container img {
		width: 110%;
	}

	.controls-container div a img {
		width: 20px;
		padding: 5px 0;
	}
</style>