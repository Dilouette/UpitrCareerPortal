import axios from "axios";
const basePath = "jobs";

const JobsService = {
  get(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  },
  all(slug = "") {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}?${slug}`)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  },
  getJobs(url = null) {
    return new Promise((resolve, reject) => {
      // Use the provided URL or fall back to the base path
      const requestUrl = url || `/${basePath}`;

      axios
        .get(requestUrl)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            console.error("API Error Response:", error.response); // Debugging
            reject(error.response);
          } else {
            console.error("API Error:", error); // Debugging
            reject(new Error(error));
          }
        });
    });
  },
  getJobDetails(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/${id}`)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  },
  apply(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/applications`, data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  },
  getAppliedJobs(slug = "") {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/applications${slug}`)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  },
};

export default JobsService;
