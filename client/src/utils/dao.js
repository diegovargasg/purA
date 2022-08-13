import axios from "axios"

const HOST = "http://localhost:3050"

const Api = {
  fetchData: function (object) {
    return axios.get(`${HOST}/api/${object}`)
  },
  saveData: function (object, data) {
    return axios({
      method: "post",
      url: `${HOST}/api/${object}`,
      headers: {},
      data: data
    })
  },
  deleteData: function (object, id) {
    return axios({
      method: "delete",
      url: `${HOST}/api/${object}/${id}`,
      headers: {},
      data: { id: id }
    })
  }
}

export default Api
