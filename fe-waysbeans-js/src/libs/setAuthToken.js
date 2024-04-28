import apiConfig from "./api"

const setAuthToken = (token) => {
  if(token) {
    return apiConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  return delete apiConfig.defaults.headers.common["Authorization"]
}

export default setAuthToken;