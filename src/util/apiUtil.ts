export function getApiWrapper(endpoint: string, func: (data: any) => void) {
    fetch(`${process.env.REACT_APP_POND_API_URL}${endpoint}`, {
        method: 'get',
        credentials: 'include'
    })
        .then((res: any) => res.json())
        .then(func)
        .catch((err) => {
            console.log(err);
        });
}
