<template>
	<nav role="navigation" class="navigation">
		<div class="navigation__logo-container">
			<router-link :to="{ name:'bugsBoard' }">
				<figure>
					<img src="/svg/bugsTracker-logo.svg" alt="Logo for the bugs tracker">
					<figcaption>Bugs Tracker</figcaption>
				</figure>
			</router-link>

			<router-link :to="{ name:'loginPage' }">
				<figure>
					<img src="/svg/person.svg" alt="image for the login page">
					<figcaption>Login</figcaption>
				</figure>
				<!-- <img src="/svg/person.svg" alt="image for the login page"> -->
			</router-link>
		</div>
	</nav>

</template>

<style>
	/* Small screen devices (968px and below) */
    @media screen and (max-width: 968px) {
		.navigation {
			width: 15%;
		}

		.navigation__logo-container {
			height: 100%;
		}
	}
		
	.navigation {
		background-color: #292F4C;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		top: 0;
		z-index: 1000;
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

	.navigation__logo-container a figure figcaption {
		text-decoration: none;
		color: white;
	}

	.navigation__logo-container img {
		width: 110%;
	}

	.controls-container div a img {
		width: 20px;
		padding: 5px 0;
	}
</style>