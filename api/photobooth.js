export default () => ({
  create(data) {
    const config = useRuntimeConfig();
    return useFetch(`request/create`, {
      method: "POST",
      body: data,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      baseURL: config.public.photobooth_api_url,
    });
  },
  updateRequest(data, id) {
    const config = useRuntimeConfig();
    return useFetch(`/requests/${id}`, {
      method: "PUT",
      body: data,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      ...interceptors(),
      baseURL: config.public.photobooth_api_url,
    });
  },

  fetchAll() {
    const config = useRuntimeConfig();
    return useFetch(`/requests`, {
      method: "GET",
      ...interceptors(),
      baseURL: config.public.photobooth_api_url,
    });
  },

  sendViaSES(id) {
    const config = useRuntimeConfig();
    return useFetch(`/send_ses/${id}`, {
        method: "POST",
        body: data,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        ...interceptors(),
      baseURL: config.public.photobooth_api_url,
    });
  },
  sendViaGmail(id) {
    const config = useRuntimeConfig();
    return useFetch(`/send_gmail/${id}`, {
        method: "POST",
        body: data,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        ...interceptors(),
      baseURL: config.public.photobooth_api_url,
    });
  },
});
