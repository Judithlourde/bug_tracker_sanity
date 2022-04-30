<template>
	<section>
		<!-- <div v-if="loading">...</div> -->
		<!-- <div v-else class="ticket"> -->
		<div class="ticket">
			<h1 v-if="!editMode">Create a Ticket</h1>
			<h1 v-else>Update your Ticket</h1>

			<div class="ticket__container">
				<form @submit.prevent="handleSubmit">
					<section>
						<label for="title">Title</label>
						<input 
							id="title" 
							name="title" 
							type="text" 
							@keyup.enter="handleChange" 
							v-model="formData.title"
						/>

						<label for="description">Description</label>
						<input 
							id="description" 
							name="description" 
							type="text" 
							@keyup.enter="handleChange" 
							v-model="formData.description"
						/>

						<label for="category">Category</label>
						<select 
							id="category"
							name="category" 
							v-model="formData.category"
							@click="handleChange" 	
						>
							<div v-for="category in categories" :key="category.id">
								<option value="category">{{ category }}</option>
							</div>
						</select>

						<label for="new-category">New Category</label>
						<input 
							id="new-category" 
							name="category" 
							type="text" 
							@keyup.enter="handleChange" 
							v-model="formData.category"
						>

						<label for="priority">Priority</label>
						<div class="ticket__container-multiple-input-container">
							<input 
								id="priority-1"
								name="priority"
								type="radio"
								@keyup.enter="handleChange"
								value="1"
								v-model="formData.priority"
							> 
							<label for="priority-1">1</label>

								<input 
								id="priority-2"
								name="priority"
								type="radio"
								@keyup.enter="handleChange"
								value="2"
								v-model="formData.priority"
							> 
							<label for="priority-2">2</label>

								<input 
								id="priority-3"
								name="priority"
								type="radio"
								@keyup.enter="handleChange"
								value="3"
								v-model="formData.priority"
							> 
							<label for="priority-3">3</label>

								<input 
								id="priority-4"
								name="priority"
								type="radio"
								@keyup.enter="handleChange"
								value="4"
								v-model="formData.priority"
							> 
							<label for="priority-4">4</label>

								<input 
								id="priority-5"
								name="priority"
								type="radio"
								@keyup.enter="handleChange"
								value="5"
								v-model="formData.priority"
							> 
							<label for="priority-5">5</label>
						</div>

						<div v-if="editMode">
							<input 
								type="range"
								id="progress"
								name="progress"
								value="formData.progress"
								min="0"
								max="100"
								@keyup.enter="handleChange"
							>
							<label for="progress">Progress</label>

							<label for="status">Status</label>
							<select 
								name="status" 
								id="status"
								@keyup.enter="handleChange"
								v-model="formData.status"
							
							>
								<option value="done">Done</option>
								<option value="working on it">Working on it</option>
								<option value="stuck">Stuck</option>
								<option value="not started">Not started</option>
							</select>
						</div>

						<input type="submit">
					</section>

					<section>
						<label for="owner">Owner</label>
						<input 
							id="owner" 
							name="owner" 
							type="text" 
							@keyup.enter="handleChange" 
							v-model="formData.owner"
						>

						<label for="ownerImage">Owner Image</label>
						<input 
							id="ownerImage" 
							name="ownerImage" 
							type="text" 
							@keyup.enter="handleChange" 
							v-model="formData.ownerImage"
						>

						<div class="owner-image">
							<img v-if="formData.ownerImage" :src="formData.ownerImage" alt="Owner image">
						</div>
					</section>
				</form>
			</div>
		</div>
		
	</section>
</template>

<script> 
	import sanity from '../sanity.js';
	import query from '../groq/ticketPage.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	export default {
		mixins: [viewMixin],

		data() {
			return {
				editMode: false,
				formData: {
					status: 'not started',
					progress: 0,
					timestamp: new Date().toISOString(),
				},
				categories: ['test1', 'test2']
			}
		},

		// async created() {
		// 	await this.sanityFetch(query, { 
		// 		slug: this.$route.params.projectSlug
		// 	});

		// 	this.metaTags({
		// 		title: this.result.title,
		// 		description: this.result.description,
		// 		image: this.result.documentation[0].asset.url
		// 	});
		// },

		methods: {
			handleSubmit() {
				console.log('submitted')
			},

			handleChange() {
				console.log(this.formData.title)
				console.log(this.formData.description)
				console.log(this.formData.timestamp)
				console.log(this.formData.status)
				console.log(this.formData.category)
				console.log(this.formData.priority)
			},
			
		}
	}
</script>

<style>
	.ticket {
		padding: 30px;
		width: 100%;
	}

	.ticket__container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.ticket__container form {
		display: flex;
	}

	.ticket__container form section {
		display: flex;
		flex-direction: column;
		margin: 10px;
		width: 500px;
	}

	.ticket__container form label {
		margin: 20px 0 0 0;	
	}

	.ticket__container form select,
	.ticket__container form input {
		padding: 10px;
		font-size: 15px;
		border-radius: 10px;
		border: 1.5px solid rgb(218, 218, 218);
		margin: 5px;
	}

	.ticket__container-multiple-input-container {
		margin: 20px 0 20px 0;
	}
</style>