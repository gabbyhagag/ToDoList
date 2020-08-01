import axios from 'axios';

// create the base url for all requests mockApi
const api = axios.create({
    baseURL: 'api',
    timeout: 5000,
});

const getMissions = () => {
    return api.get('/missions').catch((error) => {
        handleErrors(error);
    });
};

const getPublicMissions = () => {
    return api.get('/missions/all').catch((error) => {
        handleErrors(error);
    });
};

const createMission = (data) => {
    return api
        .post('/missions', data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleErrors(error);
        });
};

const handleErrors = (error) => {
    console.log(error.response);
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            if (error.response.data.title) {
                throw new Error(error.response.data.title);
            }
        }
        if (error.response.statusText) {
            throw new Error(error.response.statusText);
        }
    }
    throw new Error('Something went wrong, the service is not available');
};

export default {
    getMissions,
    getPublicMissions,
    createMission,
};
