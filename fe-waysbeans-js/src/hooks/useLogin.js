import React, { useContext } from 'react'
import apiConfig from '../libs/api'
import { UserContext } from '../stores/userContext';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate()
  const [_, dispatch] = useContext(UserContext);
  const [form, setForm] = React.useState({
    email: "",
    password: ""
  })

  const handleChanges = (e) => {
    console.log(e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await apiConfig.post("/auth/login", form)

      dispatch({
        type: "AUTH_LOGIN",
        payload: response.data.Data
      })

      window.location.reload()
    } catch (error) {
      throw error
    }
  }

  return {
    handleChanges,
    handleSubmit
  }
}

export default useLogin
