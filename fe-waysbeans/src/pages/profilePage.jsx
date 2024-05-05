import React from "react";
import Navbar from "../components/navbar";
import FormProfile from "../components/formProfile";
import Footer from "../components/footer";
import ModalEditProfile from "../elements/modalEditProfile";

const ProfilePage = () => {
  const [show, setShow] = React.useState(false);

  const isShow = () => setShow(true);
  const isClose = () => setShow(false);
  // { showModal, closeModal, loginModal }
  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className="px-28 py-28">
        <FormProfile />

        <div className="grid justify-items-end mt-10  ">
          <button
            className="text-white bg-isPrimary px-8 py-1 rounded-lg"
            onClick={isShow}
          >
            Edit
          </button>
        </div>

        <div className="h-full">
          <ModalEditProfile showModal={show} closeModal={isClose} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
