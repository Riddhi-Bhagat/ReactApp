import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",   // <- FINAL FIX
  withCredentials: true,
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
