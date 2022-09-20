var tooltipTriggerList = document.querySelectorAll(
	'[data-bs-toggle="tooltip"]'
);
var tooltipList = [...tooltipTriggerList].map(
	(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

Vue.component("platform", {
	name: "platform",
	data: function () {
		return {
			platforms: {},
			isLoading: true,
			error: "",
		};
	},
	created: function () {
		fetch(
			`${vm.$data.api_url}/wp-json/wp/v2/platforms${
				vm.$data.lang && `?lang=${vm.$data.lang}`
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				this.platforms = data;
				this.isLoading = false;
			})
			.catch((err) => {
				this.error = err;
				this.isLoading = false;
			});
	},
	template: `
	<div>
    <template v-if="!isLoading">
      <div v-if="error"class="alert alert-danger" role="alert">
				{{error.message}}
			</div>
			<template v-else>
			<div class=" mt-5 d-flex flex-wrap gap-3 w-90 m-auto">
				<a v-for="(platform, index) in platforms"
				type="button"
						:key="platform.ID"
						:href="platform.acf.hyper_link.url"
						class="col border border-dark text-dark py-3 text-center flex-fill text-decoration-none platform-link"
						data-bs-toggle="tooltip" 
						data-bs-placement="top"
						data-bs-custom-class="custom-tooltip"
						:data-bs-title="platform.excerpt.rendered"
						:title="platform.excerpt.rendered.replace('<p>','').replace('</p>','')">
					{{platform.title.rendered}}
				</a>
			</div>
			</template> 
			</template> 
			<div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
				<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
  </div>
			
      `,
});
