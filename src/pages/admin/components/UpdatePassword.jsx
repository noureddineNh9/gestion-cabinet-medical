import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../api/api";
import Modal from "../../../components/utils/modal__1/modal__1.component";
import { setNotificationOn } from "../../../redux/notification/notification.actions";

function UpdatePassword({ idUtilisateur }) {
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
         const res = await fetch(
            BASE_URL + "/api/admin/modifierMotDePasse.php",
            {
               method: "post",
               body: formData,
            }
         );

         if (res.status === 200) {
            const data = await res.json();
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "Mot de passe modifié",
               })
            );
            hideModal();
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const handleClick = () => {
      initializeForm();
      showModal();
   };

   return (
      <>
         <button className="button__6" onClick={handleClick}>
            <i className="text-4xl fas fa-key edit__icon"></i>
         </button>

         <Modal
            closeModal={hideModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <form className="form__1" ref={formElement}>
                  <br />
                  <div className="w-full">
                     <label htmlFor="motDePasse">new password :</label>
                     <input type="text" name="motDePasse" />
                  </div>
                  <button
                     className="button__1"
                     type="submit"
                     onClick={handleSubmit}
                  >
                     Ajouter
                  </button>
               </form>
            </div>
         </Modal>
      </>
   );
}

export default UpdatePassword;
