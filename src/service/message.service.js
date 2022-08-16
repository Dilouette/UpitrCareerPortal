import axios from "axios";
const basePath = "messages";

const EducationService = {
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
        .get(`/${basePath}${slug}`)
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
  single(id) {
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
  open(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/open/${id}`)
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

export default EducationService;
