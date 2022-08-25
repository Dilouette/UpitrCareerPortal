import axios from "axios";
const basePath = "account";

const AccountService = {
  updateProfile(data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/${basePath}`, data)
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
  getProfile() {
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
  changePassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/${basePath}/change-password`, data)
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

export default AccountService;
