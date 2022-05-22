import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { setCurrentUser } from "../../redux/user/user.actions";

const Sidebar = () => {
   useEffect(() => {
      const navLinks = document.querySelectorAll(".sidebar .menu .link");

      navLinks.forEach((link) => {
         link.addEventListener("click", (e) => {
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
            <div className="p-8 mb-24">
               <h4 className="text-center font-semibold">Medical</h4>
            </div>
            <ul className="menu">
               <Link className="link active" to="/patient">
                  <i className="fas fa-home"></i> Home
               </Link>
               <Link className="link" to="/patient/dossier/12">
                  <i className="fas fa-user"></i> Mon Dossier
               </Link>
               <Link className="link" to="/patient/rendez-vous">
                  <i className="fas fa-user"></i> Prendre rendez-vous
               </Link>
               <Link className="link" to="/patient/modifier-motDePasse">
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
