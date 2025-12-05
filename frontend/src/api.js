import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Token auto add in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// POST request
export async function postJSON(path, body) {
  try {
    const res = await API.post(path, body);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Request failed" };
  }
}

// GET request
export async function getJSON(path) {
  try {
    const res = await API.get(path);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Request failed" };
  }
}

// PUT request
export async function putJSON(path, body) {
  try {
    const res = await API.put(path, body);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Request failed" };
  }
}

export async function logoutJSON() {
  try {
    const res = await API.post("/auth/logout");
    return res.data;
  } catch (err) {
    return err.response?.data || { message: "Logout failed" };
  }
}


export default API;
