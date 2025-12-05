import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  withCredentials: true, // cookies send/receive
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

export default API;
