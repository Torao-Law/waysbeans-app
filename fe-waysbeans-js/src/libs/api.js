import axios from "axios"

const apiConfig = axios.create({
  // baseURL: "https://a161-182-1-230-51.ngrok-free.app/api/v1"
  baseURL: "http://localhost:5000/api/v1"
})

export default apiConfig;