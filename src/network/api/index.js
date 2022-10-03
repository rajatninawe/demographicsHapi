import axios from "axios";
import { BASE_URL } from "../../utils/Constants";
import { requestHandler, successHandler, errorHandler } from "../interceptors";

export function setToken(token) {
  // currentAuthToken = token;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
console.log("BASE_URL", BASE_URL);
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const axiosAuth = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${currentAuthToken}`,
//   },
// });

// Handle request process

axiosInstance.interceptors.request.use((request) => requestHandler(request));

// Handle response process

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
