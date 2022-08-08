import axios from "axios";
const basePath = "assessments";

const JobsService = {  
  get() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}`)
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
  submut(payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}`, payload)
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
  start(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/start/${id}`)
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
        .post(`/${basePath}`, data)
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
