export let fetchdata = async (url, data = {}, method = 'GET') => {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    //to handle if need to be changed to query of body 
    let urlFull = `http://localhost:5000${url}`;

    if (method === 'GET' || method === 'DELETE') {
        let quePar = new URLSearchParams(data).toString();
        if (quePar) {
            urlFull += `?${quePar}`;
        }
    } else {
        //adds body in if need instead
        options.body = JSON.stringify(data);
    }

    try {

        // to handle different response types if need 
        let response = await fetch(urlFull, options);
        let contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            let jsonRes = await response.json();
            if (!response.ok) {
                throw new Error(jsonRes.message || 'error indeterminate');
            }
            return jsonRes;
        } else {
            let text = await response.text();
            if (!response.ok) {
                throw new Error(text || 'error indeterminate');
            }
            return { success: true, message: text }; 
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return { success: false, message: error.message || 'Network error' };
    }
};

//old verions left if need to change back 
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