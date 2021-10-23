import * as axios from 'axios';

let api = axios.create({
    baseURL: 'https://ergast.com/api/f1/'
});

function error(e) {
  console.error(e.response ? e.response.data.message : e.message);
}

api.interceptors.response.use(function (response) {
    return response;
}, function (e) {
    error(e);
    if (e.message === "Network Error") {
        window.location.href = "/unavailableservice";
    }
    else if (e.response) {
        if (e.response.status && e.response.status === 403) {
        }
    }
    
    return Promise.reject(error);
});

export default api