import Photobooth from '@/api/photobooth';

export default defineNuxtPlugin(() => {
    const api = {
        photobooth: Photobooth(),
    };
    return {
        provide: {
            api,
        }
    }
})