export default () => ({
    create(data) {
        const config = useRuntimeConfig();
        return useFetch(`/create_request`, {
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
        return useFetch(`/get_requests`, {
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

export const templatePictures = async (data) => {
    const config = useRuntimeConfig();
    
    try {
        const response = await useFetch(`/template_pictures`, {
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

        console.log('templatePictures response:', response);

        return response;
    } catch (error) {
        console.error('Error in templatePictures:', error);
        throw error;
    }
};

export const sendEmail = async (data) => {
    const config = useRuntimeConfig();

    try {
        const response = await useFetch(`/send_email`, {
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

        console.log("Send Email response:", response);

        return response;
    } catch (error) {
        console.error("Error in SendEmail:", error);
        throw error;
    }
};

export const deleteRequestById = async (selectedRequestID) => {
    const config = useRuntimeConfig();
    try {
        const response = await useFetch(`/delete_request`, {
            method: "DELETE",
            body: selectedRequestID,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            ...interceptors(),
            baseURL: config.public.photobooth_api_url,
        });
        console.log("ID",  selectedRequestID);
        console.log("Delete Request", response);

        return response;
    } catch (error) {
        console.error("Error in deleteRequest", error);
        throw error;
    }
};


