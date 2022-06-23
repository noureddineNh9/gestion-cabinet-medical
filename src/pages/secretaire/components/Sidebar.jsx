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
            console.log("aze");
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
               <Link className="link active" to="/secretaire">
                  <i className="fas fa-home"></i> Home
               </Link>
               <Link className="link" to="/secretaire/patient">
                  <i className="fas fa-user"></i> Patients
               </Link>
               <Link className="link" to="/secretaire/rendez-vous">
                  <i className="fas fa-user"></i> Rendez-vous
               </Link>
               <Link className="link" to="/secretaire/diagnistique-audio">
                  <i className="fas fa-user"></i> Diagnostiques audio
               </Link>
               <Link className="link" to="/secretaire/modifier-motDePasse">
                  <i className="fas fa-key"></i> changer le mot de passe
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
