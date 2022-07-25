import axios from "axios";
const basePath = "account";

const ProfileService = {
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
};

export default ProfileService;
