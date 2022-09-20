Vue.component("fetya-list", {
	data: function () {
		return {
			currentComponent: "schools",
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
		<render-page slug="youngsters" :isheader="false">
      </render-page>
    <div class="d-flex justify-content-center w-90 m-auto shadow-sm">
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="currentComponent==='schools' && 'bg-active text-white'" @click="changeComponent('schools')" data-i18n="schools">Schools</div>
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="currentComponent==='camps' && 'bg-active text-white'" @click="changeComponent('camps')" data-i18n="camps">Camps</div>
      <div class="flex-fill text-center rounded-0 border-0 py-3 px-5 fw-bold" :class="currentComponent==='tot' && 'bg-active text-white'" @click="changeComponent('tot')" data-i18n="tot">TOTs</div>
    </div>
    <transition name="fade" mode="out-in" appear>
      <render-page :slug="currentComponent" :isheader="true">
      </render-page>
    </transition>
  </div>`,
});
