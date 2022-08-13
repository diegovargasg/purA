import axios from "axios"

const HOST = "http://localhost:3050"

const Api = {
  fetchData: function (object) {
    return axios.get(`${HOST}/api/${object}`)
  },
  saveData: function (object, data) {
    return axios({
      method: "post",
      url: `${HOST}/api/${object}/new`,
      headers: {},
      data: data
    })
  }
}

export default Api
