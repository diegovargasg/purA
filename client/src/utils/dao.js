import axios from "axios"

const Api = {
    fetchData: function(object) {
        return axios.get(`http://localhost:3050/api/${object}`);
    }
};

export default Api;