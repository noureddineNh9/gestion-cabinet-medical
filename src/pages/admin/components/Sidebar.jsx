import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../../components/LogoutButton";

import logo from "../../../assets/icons/logo-gcm.png";

const Sidebar = () => {
   useEffect(() => {
      const navLinks = document.querySelectorAll(".sidebar .menu .link");

      navLinks.forEach((link) => {
         link.addEventListener("click", (e) => {
            document.querySelector("#toggle-sidebar").checked = false;
            navLinks.forEach((link) => {
               link.classList.remove("active");
            });
            e.target.classList.add("active");
         });
      });
   }, []);

   return (
      <>
         <input
            className="toggle__checkbox"
            type="checkbox"
            id="toggle-sidebar"
         />
         <label
            id="sidebar-button"
            className="sidebar__button"
            htmlFor="toggle-sidebar"
         >
            <span className="sidebar__icon"></span>
         </label>
         <div className="sidebar h-screen">
            <div className="p-8 mb-8">
               <div className="flex justify-center">
                  <img src={logo} className="h-56" />
               </div>
            </div>
            <ul className="menu">
               <Link className="link active" to="/admin">
                  <i className="fas fa-home"></i> Home
               </Link>
               <Link className="link" to="/admin/medecin">
                  <i className="fas fa-user-md"></i> Medecins
               </Link>
               <Link className="link" to="/admin/secretaire">
                  <i className="fas fa-user"></i> Secrétaires
               </Link>
               <Link className="link" to="/admin/service">
                  <i className="fas fa-user"></i> Services
               </Link>
               <LogoutButton className="link">
                  <i className="fas fa-sign-out-alt"></i> log out
               </LogoutButton>
            </ul>
         </div>
      </>
   );
};

export default Sidebar;
