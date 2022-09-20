Vue.component("render-page", {
	name: "render-page",
	data: function () {
		return {
			content: {},
			isLoading: true,
			error: "",
		};
	},
	props: ["slug", "isheader"],
	watch: {
		slug: function (val, oldVal) {
			this.isLoading = true;
			this.fetchPage();
		},
	},
	methods: {
		fetchPage() {
			fetch(
				`${vm.$data.api_url}/wp-json/wp/v2/pages?slug=${
					vm.$data.lang === "en" ? this.slug : `${this.slug}-ar`
				}`
			)
				.then((res) => res.json())
				.then((data) => {
					this.content = data[0];
					this.isLoading = false;
				})
				.catch((err) => {
					this.error = err;
					this.isLoading = false;
				});
		},
	},
	created: function () {
		this.fetchPage();
	},
	template: `
  <div>
    <template v-if="!isLoading">
      <div v-if="error"class="alert alert-danger w-90 m-auto" role="alert">
				{{error.message}}
			</div>
			<template v-else>
				<transition name="fade" mode="out-in" appear>
					<h2 v-if="isheader && content.title.rendered" class="h1 px-4 my-5 d-inline-block bg-active text-white">{{content.title.rendered}}</h2>
				</transition>
				<transition name="fade" mode="out-in" appear>
					<p class="w-90 m-auto mb-5" v-html="content.content.rendered"></p>
    		</transition>
    	</template> 
    </template> 
    <div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

  </div>`,
});
