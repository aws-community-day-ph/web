export const interceptors = () => {
  const config = useRuntimeConfig();
  return {
    baseURL: config.public.api_base_url,
    server: false,
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {};

    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      // return Promise.reject(error)
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data;
    },
    onResponseError({ request, response, options }) {
      //   throw response.status;
      // const { $toast } = useNuxtApp();
      // $toast.error(response._data.errorCode);
      throw response
      // Handle the response errors
    },
  };
};
