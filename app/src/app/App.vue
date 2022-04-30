<template>
	<section class="app">
		<Navbar/>
		<RouterView />
	</section>
	
</template>

<script>
	import Navbar from '../components/Navbar.vue';
	
	export default {
		components: { Navbar }
	}
</script>

<style>
	@import '../style/reset.css';
	@import '../style/variables.css';
	@import '../style/fonts.css';
	@import '../style/style.css';
</style>