import React from 'react'

const useProfile = () => {
  const formEdit = React.useRef({
    name: null,
    gender: "",
    address: "",
    image: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Input 1:", formEdit.current.name.value);
  }

  return {
    formEdit,
    handleSubmit
  }
}

export default useProfile