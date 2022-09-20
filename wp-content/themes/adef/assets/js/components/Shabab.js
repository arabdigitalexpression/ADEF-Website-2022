Vue.component("shabab-list", {
	data: function () {
		return {
			currentComponent: "art",
		};
	},
	methods: {
		changeComponent(cmp) {
			this.currentComponent = cmp;
			console.log(this.currentComponent);
		},
	},
	template: `
  <div>
    <div class="d-flex justify-content-center w-90 m-auto shadow-sm">
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="currentComponent==='art' && 'bg-active text-white'" @click="changeComponent('art')" data-i18n="art">Art & Culture</div>
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="currentComponent==='tech' && 'bg-active text-white'" @click="changeComponent('tech')" data-i18n="tech">Tech</div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <render-page :slug="currentComponent" :isheader="true">
      </render-page>
    </transition>
  </div>`,
});
