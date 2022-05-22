import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api/api";
import { setAudio } from "../redux/compteRendu/compteRendu.actions";
import { setNotificationOn } from "../redux/notification/notification.actions";
import DropdownList from "./utils/dropdown-list/dropdown-list.component";
import Modal from "./utils/modal__1/modal__1.component";

function AjouterAudioButton({ idCompteRendu }) {
   const [secretaireSelected, setSecretaireSelected] = useState(null);
   const audioForm = useRef();

   const secretaireData = useSelector((state) => state.secretaire);

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
      audioForm.current.querySelectorAll("input, textarea").forEach((elem) => {
         elem.value = "";
      });

      audioForm.current.idCompteRendu.value = idCompteRendu;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const audioFormData = new FormData(audioForm.current);
      audioFormData.append("idSecretaire", secretaireSelected.id);

      try {
         const res = await fetch(BASE_URL + "/api/audio/post.php", {
            method: "post",
            body: audioFormData,
         });

         if (res.status === 200) {
            const data = await res.json();
            dispatch(setAudio(data));
            dispatch(
               setNotificationOn({ time: 3000, message: "audio ajouté" })
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
            <i class="fas fa-file-audio text-3xl mr-2"></i> ajouter audio
         </button>

         <Modal
            closeModal={hideModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <form className="form__1" ref={audioForm}>
                  <br />
                  <input
                     type="number"
                     name="idCompteRendu"
                     defaultValue={idCompteRendu}
                     hidden
                  />
                  <input type="number" name="idAudio" hidden />
                  <div className="w-full">
                     <label htmlFor="nom">nom :</label>
                     <input type="text" name="nom" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="description">description :</label>
                     <textarea name="description" rows={4}></textarea>
                  </div>
                  <div className="w-full">
                     <label htmlFor="idSecretaire">sercretaire :</label>
                     <DropdownList
                        values={secretaireData.map((s) => ({
                           id: s.idUtilisateur,
                           value: s.nom + " " + s.prenom,
                        }))}
                        selectedValue={secretaireSelected}
                        setSelectedValue={setSecretaireSelected}
                     />
                  </div>
                  <div className="w-full">
                     <label htmlFor="audio">audio ( *.mp3, *.m4a ) :</label>
                     <input type="file" name="audio" accept=".mp3" />
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

export default AjouterAudioButton;
