Vue.component("job-item", {
	data: function () {
		return {
			job_type: "",
		};
	},
	methods: {
		validateEmail(email) {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		},
	},
	props: ["job", "index"],
	mounted: function () {
		fetch(
			`${vm.$data.api_url}/wp-json/wp/v2/job-types/${this.job["job-types"][0]}`
		)
			.then((res) => res.json())
			.then((data) => {
				this.job_type = data.name;
			});
	},
	template: `
		<div class="accordion-item">
			<h2 class="accordion-header" :id="'flush-heading-'+ index" >
				<button
					class="accordion-button collapsed fw-bold"
					type="button"
					data-bs-toggle="collapse"
					:data-bs-target="'#flush-collapse-'+ index"
					aria-expanded="false"
					:aria-controls="'flush-collapse-'+ index"
				>
					{{job.title.rendered}}
				</button>
			</h2>
			<div
				:id="'flush-collapse-'+ index"
				class="accordion-collapse collapse"
				:aria-labelledby="'flush-heading-'+ index"
				data-bs-parent="#accordionFlushExample"
			>
				<span v-if="job_type" class="badge bg-active p-2 my-3 mb-1 rounded-0 d-inline-block">{{job_type}}</span>
				<span v-if="job.meta._remote_position" class="badge bg-active p-2 my-3 mb-1 rounded-0 d-inline-block">Remote</span>
				<div v-if="job.meta._job_location" class="text-muted">{{job.meta._job_location}}</div>
				<div>
				<span v-if="job.meta._filled" class="badge text-bg-danger mt-2">This position has been filled</span>
				</div>
				<div class="accordion-body">
					<div v-html="job.content.rendered"></div>
          <div v-if="!job.meta._filled && job.meta._application" class="d-grid gap-2 d-md-flex justify-content-md-end" >
            <a :href="validateEmail(job.meta._application) ? 'mailto:'+job.meta._application : job.meta._application" class="btn btn-dark rounded-pill m-3" type="button">Apply for job</a>
          </div>
        </div>
			</div>
		</div>`,
});

Vue.component("job-list", {
	name: "job-list",
	data: function () {
		return {
			jobs: [],
			isLoading: true,
		};
	},
	mounted: function () {
		fetch(
			`${vm.$data.api_url}/wp-json/wp/v2/job-listings${
				vm.$data.lang && `?lang=${vm.$data.lang}`
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				this.jobs = data;
				this.isLoading = false;
			})
			.catch((err) => {
				this.error = err;
				this.isLoading = false;
			});
	},
	template: `
  <div class="w-90 m-auto">
    <div v-if="!isLoading" class="accordion accordion-flush rounded-0" id="accordionExample">
			<template v-if="jobs.length > 0">
				<job-item v-for="(job, index) in jobs"
					:job="job"
					:key="job.ID" 
					:index="index+1" >
				</job-item>
			</template>
			<div v-else class="mt-5">
				<div class="alert alert-secondary rounded-0" role="alert" data-i18n="jobs_message">
					Sorry there is no jobs at the moment
				</div>
			</div>
    </div> 
    <div v-else class="text-center mt-5 d-flex justify-content-center align-items-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

  </div>`,
});
