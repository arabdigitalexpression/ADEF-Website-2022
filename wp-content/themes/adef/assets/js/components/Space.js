Vue.component("space-item", {
	data: function () {
		return {
			img: "",
		};
	},
	props: ["space", "index"],
	methods: {
		async navigate(id) {
			await this.$nextTick(() => {
				vm.space_container = { componentName: "space-info", param: id };
			});
		},
	},
	mounted: function () {
		fetch(`${vm.$data.api_url}/wp-json/wp/v2/media/${this.space.acf.Gallery}`)
			.then((res) => res.json())
			.then((data) => {
				this.img = data.guid.rendered;
			});
	},
	template: `
		<section class="row my-2 border border-dark space-item" @click="navigate(space.id)">
				<div :class="index % 2 !== 0 ? 'col-md-5 px-0' : 'col-md-5 px-0 order-md-2'">
					<img
						:src="img"
						class="w-100 rounded-0 mt-0"
						style="object-fit: cover; height: 250px"
						:alt="space.slug"
					/>
				</div>
				<div
					:class="index % 2 !== 0 ? 'col-md-7' : 'col-md-7 order-md-1'"
				>
						<h2 class="card-title mt-2">{{space.title.rendered}}</h2>
						<p class="card-text mt-3" v-html="space.excerpt.rendered.slice(0,400)+' ...'"></p>
				</div>
		</section>`,
});

Vue.component("space-list", {
	data: function () {
		return {
			spaces: [],
		};
	},
	mounted: function () {
		fetch(
			`${vm.$data.api_url}/wp-json/wp/v2/spaces${
				vm.$data.lang && `?lang=${vm.$data.lang}`
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				this.spaces = data;
			})
			.catch((err) => {});
	},
	template: `
	<div class="container gy-5">
		<template v-if="spaces.length > 0">
			<space-item v-for="(space, index) in spaces"
			:space="space"
			:key="space.ID" 
			:index="index+1" @click="console.log('clicked')">
			</space-item>
		</template>
		<div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
	</div>`,
});

Vue.component("space-info", {
	data: function () {
		return {
			space: [],
			hero_img_url: "",
			isLoading: true,
		};
	},
	props: ["space_id"],
	watch: {
		space_id: function (val, oldVal) {
			this.isLoading = true;
			this.fetchPage();
		},
	},
	methods: {
		fetchPage() {
			fetch(`${vm.$data.api_url}/wp-json/wp/v2/spaces/${222}`)
				.then((res) => res.json())
				.then((data) => {
					this.space = data;
				})
				.then(() => {
					fetch(
						`${vm.$data.api_url}/wp-json/wp/v2/media/${this.space.acf.Gallery}`
					)
						.then((res) => res.json())
						.then((data) => {
							this.hero_img_url = data.guid.rendered;
						});
					this.isLoading = false;
				})
				.catch((err) => {
					this.isLoading = false;
				});
		},
		async navigate() {
				await this.$nextTick(() => {
					vm.space_container = { componentName: "space-list" };
				});
		},
	},

	mounted: function () {
		this.fetchPage();
	},
	template: `
	<div>
		<div v-if="!isLoading">
		<span type="button" class="px-3 py-1 bg-active my-2 text-white d-inline-block" 
		@click="navigate()">Go Back</span>
			<div class="row">
				<div class="col">
					<h2 class="h1">{{space.title.rendered}}</h2>
				</div>
				<div class="col">
					<img :src="hero_img_url" :alt="space.title.rendered" class="w-100"/>
				</div>
			</div>
			<div class="row">
					<div class="col">
						<p class="lead" v-html="space.content.rendered"></p>
					</div>
			</div>
		</div>
		<div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
			<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
`,
});
