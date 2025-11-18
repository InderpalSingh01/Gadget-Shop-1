import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//  request interceptor
API.interceptors.request.use(
  (config) => {
    console.log("Request sent");
    console.log("URL", config.baseURL + config.url);
    console.log("Method", config.method?.toUpperCase());
    // console.log("Data", config.data);

    return config;
  },
  (error) => {
    console.log("Error", error.message);
    return Promise.reject(error);
  }
);

// response interceptor
API.interceptors.response.use(
  (response) => {
    console.log("Response Recieved");
    console.log("status", response.status);
    // console.log("data", response.data);

    return response;
  },
  (error) => {
    console.log("Response Error");
    if (error.response) {
      console.log("Status", error.response.status);
      console.log("Message", error.response.data.message || error.message);
      if (error.response.status === 401) {
        console.warn("Unauthorized : Maybe session exppired or not logged in");
      } else if (error.response.status === 500) {
        console.log("Internal server error");
      } else {
        console.log("Network error", error.message);
      }
    }
    return Promise.reject(error);
  }
);

export const loginapi = async (formdata) => {
  try {
    const response = await API.post("/auth/signin", formdata);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutapi = async () => {
  try {
    const response = await API.get("/auth/logOut");
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default API;