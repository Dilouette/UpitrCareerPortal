import axios from "axios";
const basePath = "authentication";

const UserService = {
  signUp(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/signup`, data)
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

  resendConfirmation(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/resend-confirmation`, data)
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

  confirmation(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/email-confirmation`, data)
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

  signIn(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/signin`, data)
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

  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/forgot-password`, data)
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

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/reset-password`, data)
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

export default UserService;
