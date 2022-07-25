import axios from "axios";

export default class BaseService {
  async sendRequest(requestUrl, method, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: requestUrl,
        method: method,
        data: data,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(new Error(error));
          }
        });
    });
  }
}
