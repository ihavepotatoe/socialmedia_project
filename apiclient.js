const api_Base_Url = "https://v2.api.noroff.dev";

async function apiRequest(endpoint, options = {}) {
  const url = `${api_Base_Url}${endpoint}`;

  const accessToken = localStorage.getItem("accessToken");

  const apiKey = localStorage.getItem("apiKey");

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),

    ...(apiKey && {
      "X-Noroff-API-Key": apiKey,
    }),
    ...options.headers,
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  let responseData = null;
  if (contentType && contentType.includes("application/json")) {
    responseData = await response.json();
  }

  if (!response.ok) {
    const errorMessage =
      responseData.errors?.[0]?.message || "something went wrong";

    throw new Error(errorMessage);
  }
  return responseData;
}

export async function get(endpoint) {
  return apiRequest(endpoint, {
    method: "GET",
  });
}

export async function post(endpoint, data) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function put(endpoint, data) {
  return apiRequest(endpoint, {
    method: "PUT",
    ...(data && {
      body: JSON.stringify(data),
    }),
  });
}

export async function del(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
}
