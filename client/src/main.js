export async function fetchdata(route = '', data = {}, methodType ) {
    const response = await fetch(`http://localhost:5000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
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
}