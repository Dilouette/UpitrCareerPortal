import axios from "axios";
import TokenService from "./token.service";

const CoreService = {
  init() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.headers.common.Accept = "application/json";

    axios.interceptors.request.use(
      (config) => {  
        let token = TokenService.getToken()
        ? TokenService.getToken()
        : null;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }      
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status == 401) {
          TokenService.destroyToken();
        }
        return Promise.reject(error);
      }
    );
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      TokenService.getToken().accessToken
    }`;
  },
};

export default CoreService;
