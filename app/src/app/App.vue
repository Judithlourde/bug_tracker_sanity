<template>
	<section>
		<div class="app">
			<Navbar/>
			<Dashboard/>
		</div>
		
		<RouterView/>
	</section>
	
	
</template>

<script>
	import Navbar from '../components/Navbar.vue';
	import Dashboard from '../views/Dashboard.vue';
	
	export default {
		components: { 
			Navbar,
			Dashboard,

		}
	}
</script>

<style>
	@import '../style/reset.css';
	@import '../style/variables.css';
	@import '../style/fonts.css';
	@import '../style/style.css';
</style>