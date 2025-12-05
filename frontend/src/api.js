const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function postJSON(path, body, opts={}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...opts
  });
  const json = await res.json().catch(()=>null);
  if (!res.ok) {
    const err = new Error(json?.message || 'Request failed');
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export async function getJSON(path, opts={}) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...opts });
  const json = await res.json().catch(()=>null);
  if (!res.ok) {
    const err = new Error(json?.message || "Request failed");
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export async function putJSON(path, body, opts={}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...opts
  });
  const json = await res.json().catch(()=>null);
  if (!res.ok) {
    const err = new Error(json?.message || 'Request failed');
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}
