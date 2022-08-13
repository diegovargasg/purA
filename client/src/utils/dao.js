import axios from "axios"

const HOST = "http://localhost:3050";

const Api = {
    fetchData: function(object) {
        return axios.get(`${HOST}/api/${object}`);
    },
    saveData: function(object) {
        return axios.post(`${HOST}/api/${object}`);
    }
};

export default Api;