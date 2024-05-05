import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const ContactMePage = () => {
  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <form className="px-28 py-28 w-4/5 mx-auto">
        <p className="font-bold text-2xl mb-2 text-isPrimary text-center mb-10">
          GET IN TOUCH
        </p>

        <div className="mb-4">
          <label className="text-isPrimary font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border rounded-lg border-gray-500 mt-2"
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div className="mb-4">
          <label className="text-isPrimary font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border rounded-lg border-gray-500 mt-2"
            type="text"
            name="email"
            id="email"
          />
        </div>

        <div className="mb-4">
          <label className="text-isPrimary font-bold" htmlFor="subject">
            Subject
          </label>
          <textarea
            className="w-full p-2 border rounded-lg border-gray-500 mt-2 resize-none h-40"
            type="text"
            name="subject"
            id="subject"
          />
        </div>

        <div className="grid justify-items-end mt-10">
          <button
            className="text-white bg-isPrimary px-8 py-1 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactMePage;
