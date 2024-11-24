import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { IoBarChartSharp, IoLogOut, IoPerson } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import MenejemenAkunModal from "./modals/MenejemenAkunModal";
import { AnimatePresence } from "framer-motion";
import { RiDashboardFill, RiFolderHistoryFill } from "react-icons/ri";

import { auth } from "../config/Database";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openAkun, setOpenAkun] = useState(false);

  const navigate = useNavigate();
  const logout = async() => {
    try {
      await signOut(auth);
      alert("Berhasil Logout!");
      navigate("/"); // Arahkan kembali ke halaman login
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  const handleManajemen = () => {
    setOpenSideBar(false);
    setOpenAkun(true);
  };



  return (
    <div>
      <div className="">
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 flex items-center justify-start z-40 bg-black bg-opacity-60 transition-opacity duration-500 ${
            openSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute z-40 bg-gradient-to-t from-[#202020] to-[#000000] w-64 h-[100vh] drop-shadow-lg transform transition-transform duration-500 ${
              openSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full">
              <div className="w-full relative">
                <button
                  onClick={() => setOpenSideBar(false)}
                  className="absolute top-1 right-2"
                >
                  <IoIosClose color="white" size={30} className="" />
                </button>
                <Link
                  to="/dasbor"
                  className=" text-white rounded-md flex justify-center items-center w-full pt-2"
                >
                  <svg
                    className="bg-white rounded-full border border-gray-200"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="7" r="5" fill="#8888" />
                    <path
                      d="M12 14c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
                      fill="#8888"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-[16%] grid gap-y-3 px-3">
                <Link
                  to="/dasbor"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  <RiDashboardFill color="white" size={15} className="mr-4" />
                  Dasbor
                </Link>
                <Link
                  to="/prediksi"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  <IoBarChartSharp color="white" size={15} className="mr-4" />
                  Prediksi
                </Link>
                <Link
                  to="/riwayat"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  <RiFolderHistoryFill color="white" size={15} className="mr-4" />
                  Riwayat
                </Link>
                <button
                  onClick={() => handleManajemen()}
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  <IoPerson color="white" size={15} className="mr-4" />
                  Manajemen Akun
                </button>
                <button
                  onClick={logout}
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  <IoLogOut color="white" size={15} className="mr-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openAkun && <MenejemenAkunModal setIsOpenModalAdd={setOpenAkun} />}
      </AnimatePresence>
      <div className="sm:hidden block bg-white drop-shadow-lg w-full flex m-0 py-2 z-10 justify-between items-center fixed">
        <div className="flex pl-5 justify-between w-full items-center">
          <button onClick={() => setOpenSideBar(true)} className="">
            <GiHamburgerMenu color="gray" size={20} />
          </button>
          <div className="text-black mx-8 flex justify-end">
          <svg
              className="bg-white rounded-full border border-gray-200"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="7" r="5" fill="#8888" />
              <path
                d="M12 14c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
                fill="#8888"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
