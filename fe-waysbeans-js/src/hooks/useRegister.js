import React from 'react'
import apiConfig from '../libs/api'

const useRegister = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChanges = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await apiConfig.post("/auth/register", form)

      console.log(response)
    } catch (error) {
      throw error
    }
  }

  return {
    handleChanges,
    handleSubmit
  }
}

export default useRegister