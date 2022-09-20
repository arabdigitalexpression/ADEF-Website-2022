Vue.component("news-list", {
	data: function () {
		return {
			selectComponent: "job-list",
		};
	},
	methods: {
		changeComponent(cmp) {
			this.selectComponent = cmp;
		},
	},
	template: `
  <div>
    <div class="d-flex justify-content-center w-90 m-auto shadow-sm mb-5">
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="selectComponent=='job-list' && 'bg-active text-white'" @click="changeComponent('job-list')" data-i18n="jobs">Jobs</div>
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="selectComponent=='post-list' && 'bg-active text-white'" @click="changeComponent('post-list')" data-i18n="blog">Blog</div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <component :is="selectComponent">
      </component>
    </transition>
  </div>`,
});
