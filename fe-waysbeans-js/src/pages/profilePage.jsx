import React from 'react'
import Navbar from '../components/navbar'
import FormProfile from '../components/formProfile'
import Footer from '../components/footer';

const ProfilePage = () => {
  const handleUpdate = (newValue) => {
    console.log('New value:', newValue);
    // Lakukan sesuatu dengan nilai baru di sini, misalnya kirim ke server atau perbarui state lainnya
  };
  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className='px-28 py-28'>
        <FormProfile initialValue="Initial Value" onUpdate={handleUpdate} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ProfilePage