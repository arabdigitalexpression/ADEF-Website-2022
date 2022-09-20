Vue.component("deca-list", {
	data: function () {
		return {
			selectComponent: vm.space_container,
			space_id: "",
		};
	},
	template: `
  <div>
    <transition name="fade" mode="out-in" appear>
      <component :is="selectComponent.componentName" 
			v-bind="selectComponent.param && { space_id : selectComponent.param }">
      </component>
    </transition>
  </div>`,
});
