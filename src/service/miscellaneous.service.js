import axios from "axios";
const basePath = "miscellaneous";

const MiscServices = {  
  getCountries() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/countries`)
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
  getRegions(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/regions/${id}`)
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
  getCities(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/cities/${id}`)
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
  getCurrencies() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/currencies`)
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
  getDesignations() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/designations`)
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
  getIndustries() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/industries`)
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
  getEducationLevels() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/education-levels`)
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
  getEmploymentTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/employment-types`)
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
  getExperienceLevels() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/experience-levels`)
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
  getJobFunctions() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/job-functions`)
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
  getQuestionTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/question-types`)
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
  getDegreeClassifications() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/degree-classifications`)
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
  getActivityImportance() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/activity-importance`)
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
  getActivityType() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/activity-types`)
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
  getActivityRelations() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/activity-relations`)
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

export default MiscServices;
