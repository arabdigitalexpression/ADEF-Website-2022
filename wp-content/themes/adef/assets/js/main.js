var translations = {
	en: {
		about: "About ADEF",
		youngsters: "Youngsters",
		youth: "Youth",
		deca: "Deca",
		platforms: "Platforms",
		news: "News",
		schools: "Schools",
		camps: "Camps",
		tot: "TOTs",
		art: "Art & Culture",
		tech: "Tech",
		jobs: "Jobs",
		jobs_message: "There are no jobs at the moment",
		blog: "Blog",
		blog_message: " Sorry there is no articles at the moment ",
		switcher: "Choose your favorite language",
		contact: "Contact us",
		_404: "404",
		not_found: "Page Not Found",
	},
	ar: {
		about: "عن أضف",
		youngsters: "فتية",
		youth: "شباب",
		deca: "دكة",
		platforms: "منصات",
		news: "أخبار",
		schools: "مدارس",
		camps: "معسكرات",
		tot: "تدريب المدربين",
		art: "فنون و ثقافة",
		tech: "تقنية",
		jobs: "وظائف",
		jobs_message: "لا يوجد وظائف فى الوقت الحالى",
		blog: "مدونة",
		blog_message: "لا يوجد مقالات فى الوقت الحالى",
		switcher: "اختر لغتك المفضلة",
		contact: "تواصل معنا",
		_404: "٤٠٤",
		not_found: "الصفحة غير موجودة",
	},
};
var vm = new Vue({
	el: "#root",
	data() {
		return {
			api_url: "",
			lang: localStorage.getItem("lang") || "en",
			space_container: { componentName: "space-list" },
		};
	},
	mounted: function () {
		if (!localStorage.getItem("lang")) {
			fetch(`${this.api_url}/wp-json/pll/v1/languages`)
				.then((res) => res.json())
				.then((data) => {
					localStorage.setItem(
						"lang",
						data.filter((lang) => lang.is_default_lang === true)[0].slug
					);
				});
		}
	},
	watch: {
		lang: function (val, oldVal) {
			location.reload();
		},
	},
});
Vue.component("lang-switcher", {
	data: function () {
		return {
			langs: {},
		};
	},
	mounted: function () {
		fetch(`${vm.$data.api_url}/wp-json/pll/v1/languages`)
			.then((res) => res.json())
			.then((data) => {
				this.langs = data;
			});
	},
	methods: {
		changeLanguage(code) {
			localStorage.setItem("lang", code);
			location.reload();
		},
		hideSwitcher() {
			switcher.style.display = "none";
		},
	},
	template: `
	<div id="lang-switcher" >
	<div
	class="vh-100 vw-100 d-flex justify-content-center align-items-center flex-column bg-opacity-75">
		<i class="bi bi-x position-absolute top-0 start-0" @click="hideSwitcher()"></i>
		<h1 data-i18n="switcher">Choose your favorite language</h1>
		<div class="d-flex justify-content-center align-items-center">
		<span 
		v-for="(lang, index) in langs" 
		:key="lang.term_id" 
		@click="changeLanguage(lang.slug)">
		{{lang.name}}
		</span>
		</div>
		</div>
		</div>`,
});

// document.addEventListener("DOMContentLoaded", () => {
// 	if (vm.$data.lang === "ar") {
// 		const elements = document.querySelectorAll("[data-i18n]");
// 		elements.forEach((element) => {
// 			const translationKey = element.getAttribute("data-i18n");
// 			element.textContent = translations[vm.$data.lang][translationKey];
// 		});
// 		document.dir = "rtl";
// 		const head = document.getElementsByTagName("head")[0];
// 		head.innerHTML = head.innerHTML.replace("style.css", "rtl.css");
// 		head.innerHTML +
// `	\n<link rel="stylesheet" id="main-css" href="${vm.$data.api_url}/wp-content/themes/adef/rtl.css" type="text/css" media="all">`;
// 	} else {
// 		document.dir = "ltr";
// 	}
// });

var switcher = document.getElementById("lang-switcher");
var showSwitcherBtn = document.getElementById("show-switcher");
showSwitcherBtn.addEventListener("click", () => {
	switcher.style.display = "block";
});
