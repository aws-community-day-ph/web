export default () => ({
    fetchRequets() {
        const config = useRuntimeConfig()
        return useFetch(`/requests`, { method: 'GET', ...interceptors(), baseURL: config.public.photobooth_api_url });
    },
  
})