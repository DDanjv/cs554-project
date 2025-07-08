export const fetchdata = async (url, data = {}, method = 'GET') => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let fullUrl = `http://localhost:5000${url}`;

    if (method === 'GET' || method === 'DELETE') {
        const queryParams = new URLSearchParams(data).toString();
        if (queryParams) {
            fullUrl += `?${queryParams}`;
        }
    } else {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(fullUrl, options);

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonResponse = await response.json();
            if (!response.ok) {
                throw new Error(jsonResponse.message || 'Something went wrong');
            }
            return jsonResponse;
        } else {
            const text = await response.text();
            if (!response.ok) {
                throw new Error(text || 'Something went wrong');
            }
            return { success: true, message: text }; 
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return { success: false, message: error.message || 'Network error' };
    }
};
/*export async function fetchdata(route = '', data = {}, methodType ) {
    let url = `http://localhost:5000${route}`;
    let options = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    if (methodType === 'GET') {
        url += '?' + new URLSearchParams(data).toString();
        options.body = null;
    }
    else if (methodType === 'DELETE') {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.success === false) {
        throw json;
    }
    if (response.ok) {
        return json;
    }
    else{
        throw json;
    }
}*/