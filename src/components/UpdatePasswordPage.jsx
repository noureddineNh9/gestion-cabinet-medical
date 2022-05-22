import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { setNotificationOn } from "../redux/notification/notification.actions";

function UpdatePasswordPage({ idUtilisateur }) {
   const formElement = useRef();

   const dispatch = useDispatch();

   // ---------------------- Modal --------------------------------
   const [modalActive, setModalActive] = useState(false);
   const showModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };
   const hideModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
      initializeForm();
   };
   // -------------------------------------------------------------

   const initializeForm = () => {
      formElement.current
         .querySelectorAll("input, textarea")
         .forEach((elem) => {
            elem.value = "";
         });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(formElement.current);
      formData.append("idUtilisateur", idUtilisateur);

      try {
         const res = await fetch(BASE_URL + "/api/modifierMotDePasse.php", {
            method: "post",
            body: formData,
         });

         const data = await res.json();
         if (res.status === 200) {
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "Mot de passe modifié",
               })
            );
            initializeForm();
         } else {
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: data,
                  type: "error",
               })
            );
         }
      } catch (error) {}
   };
   return (
      <div>
         <h3 className="title__1">Modifier le mot de passe</h3>
         <form onSubmit={handleSubmit} className="form__1" ref={formElement}>
            <br />
            <div className="w-full">
               <label>votre mot de passe :</label>
               <input type="text" name="oldPassword" />
            </div>
            <div className="w-full">
               <label>nouveau mot de passe :</label>
               <input type="text" name="newPassword" />
            </div>
            <div className="w-full">
               <label>confirmation :</label>
               <input type="text" name="confirmedPassword" />
            </div>
            <br />
            <button className="button__1" type="submit">
               Modifier
            </button>
         </form>
      </div>
   );
}

export default UpdatePasswordPage;
