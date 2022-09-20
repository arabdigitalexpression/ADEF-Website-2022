Vue.component("post-item", {
	data: function () {
		return {
			img: "",
		};
	},
	props: ["post", "index"],
	mounted: function () {
		fetch(`${vm.$data.api_url}/wp-json/wp/v2/media/${this.post.acf.image}`)
			.then((res) => res.json())
			.then((data) => {
				this.img = data.guid.rendered;
			});
	},
	template: `
		<div class="border mt-0 px-0">
		<div class="row g-1" style="cursor:pointer;">
				<div class="col-md-5">
					<img
						:src="img"
						class="w-100 rounded-0 mt-0"
						style="object-fit: cover; height: 150px"
						:alt="post.slug"
					/>
				</div>
				<div
					class="col-md-7"
				>
						<h5 class="card-title mt-3">{{post.title.rendered}}</h5>
						<p class="card-text text-muted" v-html="post.excerpt.rendered.slice(0,100)"></p>
				</div>
				</div>
		</div>`,
});

Vue.component("post-list", {
	data: function () {
		return {
			posts: [],
		};
	},
	mounted: function () {
		fetch(
			`${vm.$data.api_url}/wp-json/wp/v2/posts${
				vm.$data.lang && `?lang=${vm.$data.lang}`
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				this.posts = data;
			})
			.catch((err) => {
				this.error = err;
				this.isLoading = false;
			});
	},
	template: `
		<div v-if="!isLoading">
			<div class="grid row-cols-md-2 g-5 w-90 m-auto mt-5" v-if="posts.length > 0">
				<post-item v-for="(post, index) in posts"
				:post="post"
				:key="post.ID" :index="index+1">
				</post-item>
			</div>
			<div v-else class="w-90 m-auto mt-5">
				<div class="alert alert-secondary rounded-0" role="alert" data-i18n="blog_message">
					Sorry there is no articles at the moment
				</div>
			</div>
		</div>
		<div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
	`,
});
