import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/modal__1/modal__1.component";
import {
   ajouterMedicament,
   ajouterPrescription,
   deleteMedicament,
   modifierMedicament,
   modifierPrescription,
} from "../../redux/prescription/prescription.actions";
import { BASE_URL } from "../../api/api";
import { setNotificationOn } from "../../redux/notification/notification.actions";

export const Prescription = ({ idConsultation, userType }) => {
   const [ButtonValue, setButtonValue] = useState("ajouter");

   const formElement = useRef();
   const dispatch = useDispatch();
   const prescription = useSelector(
      (state) =>
         state.prescription.filter((p) => p.idConsultation == idConsultation)[0]
   );

   // ---------------------- Modal --------------------------------
   const [modalActive, setModalActive] = useState(false);
   const showModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };
   const hideModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };
   // -------------------------------------------------------------

   useEffect(() => {
      const collapseitems = document.querySelectorAll(
         "#collapse-list .collapse-item"
      );

      const collapseDesc = document.querySelectorAll(
         "#collapse-list .collapse-desc"
      );

      collapseDesc.forEach((desc) => {
         desc.classList.add("hidden");
      });

      collapseitems.forEach((c) => {
         if (c.getAttribute("listener") !== "true") {
            c.setAttribute("listener", true);
            c.addEventListener("click", (e) => {
               console.log("clicked");
               collapseDesc.forEach((desc) => {
                  if (desc.getAttribute("data-id") === e.target.id) {
                     desc.classList.toggle("hidden");
                  } else {
                     desc.classList.add("hidden");
                  }
               });
            });
         }
      });
   }, [prescription]);

   const initializeForm = () => {
      formElement.current
         .querySelectorAll("input:not([type='radio']), textarea")
         .forEach((elem) => {
            elem.value = "";
         });

      // formElement.current
      //    .querySelectorAll("input[type='radio']")
      //    .forEach((elem) => {
      //       elem.checked = false;
      //    });
      formElement.current.idPrescription.value = prescription.idPrescription;
      formElement.current.matin.value = "aucun";
      formElement.current.midi.value = "aucun";
      formElement.current.soir.value = "aucun";
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(formElement.current);
      const idMedicament = formData.get("idMedicament");

      if (!idMedicament) {
         console.log(Object.fromEntries(formData));
         //ajouter;
         try {
            const res = await fetch(BASE_URL + "/api/medicament/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(ajouterMedicament(data));
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "medicament ajouté avec succès",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      } else {
         // modifier
         try {
            const res = await fetch(BASE_URL + "/api/medicament/put.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               dispatch(modifierMedicament(Object.fromEntries(formData)));
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "medicament modifié avec succès",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const onAjouterMedicament = () => {
      setButtonValue("ajouter");
      initializeForm();
      showModal();
   };

   const onUpdateMedicament = (id) => {
      let medicament = prescription.medicaments.filter(
         (m) => m.idMedicament == id
      )[0];

      console.log(medicament);

      // formElement.current
      //    .querySelectorAll("input[type='radio']")
      //    .forEach((elem) => {
      //       elem.checked = false;
      //    });

      formElement.current.idMedicament.value = medicament.idMedicament;

      formElement.current.nom.value = medicament.nom;
      formElement.current.descriptionTraitement.value =
         medicament.descriptionTraitement;
      formElement.current.dureeParJour.value = medicament.dureeParJour;
      formElement.current.matin.value = medicament.matin;
      formElement.current.midi.value = medicament.midi;
      formElement.current.soir.value = medicament.soir;

      setButtonValue("modifier");
      showModal();
   };

   const onDeleteMedicament = async (id) => {
      const confirm = window.confirm("Vous voulez vraiment le supprimer ?");
      if (confirm) {
         try {
            const res = await fetch(
               BASE_URL + "/api/medicament/delete.php?id=" + id
            );

            if (res.status === 200) {
               dispatch(
                  deleteMedicament({
                     idMedicament: id,
                     idPrescription: prescription.idPrescription,
                  })
               );
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "medicament supprimer",
                  })
               );
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const onAjoutePrescription = async () => {
      const formData = new FormData();
      formData.append("idConsultation", idConsultation);
      try {
         const res = await fetch(BASE_URL + "/api/prescription/post.php", {
            method: "post",
            body: formData,
         });

         if (res.status === 200) {
            const data = await res.json();
            dispatch(ajouterPrescription(data));

            hideModal();
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const onUpdatePrescription = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      try {
         const res = await fetch(BASE_URL + "/api/prescription/put.php", {
            method: "post",
            body: formData,
         });

         if (res.status === 200) {
            const data = await res.json();
            dispatch(
               modifierPrescription({
                  ...prescription,
                  conseilsMedicaux: formData.get("conseilsMedicaux"),
               })
            );
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "modification effectuée",
               })
            );
            console.log(data);
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   return (
      <>
         {prescription ? (
            <>
               <div className="form__2 " id="contentToPrint">
                  <div className="flex items-center mb-8">
                     <h3 className=" w-full">list des médicaments</h3>
                     {userType === "medecin" && (
                        <button
                           className="button__3"
                           onClick={onAjouterMedicament}
                        >
                           ajouter
                        </button>
                     )}
                  </div>

                  <ul id="collapse-list" className="medicament__list">
                     {prescription.medicaments.map((m) => (
                        <div key={m.idMedicament}>
                           <div
                              id={m.idMedicament}
                              className="collapse-item medicament__title flex justify-between"
                           >
                              <p>{m.nom}</p>

                              {userType === "medecin" && (
                                 <div>
                                    <button
                                       className="ml-4"
                                       onClick={() =>
                                          onUpdateMedicament(m.idMedicament)
                                       }
                                    >
                                       {/* <i className="text-4xl fas fa-eye edit__icon"></i> */}
                                       <i className="text-4xl far fa-edit edit__icon"></i>
                                    </button>
                                    <button
                                       className="ml-4"
                                       onClick={() =>
                                          onDeleteMedicament(m.idMedicament)
                                       }
                                    >
                                       <i className="text-4xl far fa-trash-alt delete__icon"></i>
                                    </button>
                                 </div>
                              )}
                           </div>
                           <div
                              data-id={m.idMedicament}
                              className="collapse-desc medicament__desc"
                           >
                              <div className="input__group">
                                 <label htmlFor="">nom de médicament : </label>
                                 <input
                                    type="text"
                                    defaultValue={m.nom}
                                    disabled
                                 />
                              </div>
                              <div className="input__group">
                                 <label htmlFor="descriptionTraitement">
                                    description de traitement :
                                 </label>
                                 <textarea
                                    name="descriptionTraitement"
                                    id=""
                                    cols="30"
                                    rows="4"
                                    defaultValue={m.descriptionTraitement}
                                    disabled
                                 ></textarea>
                              </div>
                              <div className="input__group">
                                 <label htmlFor="dureParJour">
                                    durée (par jour) :
                                 </label>
                                 <input
                                    name="dureParJour"
                                    type="text"
                                    defaultValue={m.dureeParJour}
                                    disabled
                                 />
                              </div>
                              <div className="input__group">
                                 <label htmlFor="dosage">dosage :</label>
                                 <input
                                    name="dosage"
                                    type="text"
                                    defaultValue={m.dosage}
                                    disabled
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </ul>

                  <br />
                  <hr />
                  <br />
                  <form onSubmit={onUpdatePrescription}>
                     <input
                        type="number"
                        name="idPrescription"
                        defaultValue={prescription.idPrescription}
                        hidden
                     />
                     <div className="input__group">
                        <label htmlFor="">conseils medicaux :</label>
                        <textarea
                           name="conseilsMedicaux"
                           cols="30"
                           rows="4"
                           defaultValue={prescription.conseilsMedicaux}
                           disabled={userType !== "medecin"}
                        ></textarea>
                     </div>
                     {userType === "medecin" && (
                        <button className="button__1" type="submit">
                           Enregister
                        </button>
                     )}
                  </form>
               </div>

               {/* ******************************* Modal  *************************************** */}
               <Modal
                  closeModal={hideModal}
                  className={`${modalActive ? "active" : ""}`}
               >
                  <div>
                     <form
                        id="compte-rendu-form"
                        className="form__1"
                        onSubmit={handleSubmit}
                        ref={formElement}
                     >
                        <input
                           type="number"
                           name="idPrescription"
                           defaultValue={prescription.idPrescription}
                           hidden
                        />
                        <input type="number" name="idMedicament" hidden />
                        <div className="w-full">
                           <label htmlFor="nom">nom de médicament :</label>
                           <input type="text" name="nom" />
                        </div>
                        <div className="w-full">
                           <label htmlFor="descriptionTraitement">
                              description de traitement :
                           </label>
                           <textarea
                              name="descriptionTraitement"
                              rows={4}
                           ></textarea>
                        </div>
                        <div className="w-full">
                           <label htmlFor="dureeParJour">
                              durée de traitement (par jour) :
                           </label>
                           <input type="number" name="dureeParJour" />
                        </div>

                        <br />

                        <div className="w-full flex flex-wrap">
                           <label htmlFor="matin" className="mr-4 mb-0">
                              matin :
                           </label>
                           <div className="flex flex-wrap">
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="matin"
                                    value="aucun"
                                 />
                                 <span>aucun</span>
                              </div>

                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="matin"
                                    value="avant"
                                 />
                                 <span>avant</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="matin"
                                    value="auMilieu"
                                 />
                                 <span>au milieu</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="matin"
                                    value="apres"
                                 />
                                 <span>apres</span>
                              </div>
                           </div>
                        </div>

                        <div className="w-full flex flex-wrap">
                           <label htmlFor="midi" className="mr-4 mb-0">
                              midi :
                           </label>
                           <div className="flex flex-wrap">
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="midi"
                                    value="aucun"
                                 />
                                 <span>aucun</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="midi"
                                    value="avant"
                                 />
                                 <span>avant</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="midi"
                                    value="auMilieu"
                                 />
                                 <span>au milieu</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="midi"
                                    value="apres"
                                 />
                                 <span>apres</span>
                              </div>
                           </div>
                        </div>

                        <div className="w-full flex flex-wrap">
                           <label htmlFor="soir" className="mr-4 mb-0">
                              soir :
                           </label>
                           <div className="flex flex-wrap">
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="soir"
                                    value="aucun"
                                 />
                                 <span>aucun</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="soir"
                                    value="avant"
                                 />
                                 <span>avant</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="soir"
                                    value="auMilieu"
                                 />
                                 <span>au milieu</span>
                              </div>
                              <div className="flex items-center mr-4">
                                 <input
                                    type="radio"
                                    name="soir"
                                    value="apres"
                                 />
                                 <span>apres</span>
                              </div>
                           </div>
                        </div>
                        <hr />
                        <br />
                        <button className="button__1" type="submit">
                           {ButtonValue}
                        </button>
                     </form>
                  </div>
               </Modal>
            </>
         ) : (
            <div className="flex justify-center items-center ">
               {userType === "medecin" ? (
                  <button
                     onClick={onAjoutePrescription}
                     className="button__4 mt-80"
                  >
                     ajouter la prescription
                  </button>
               ) : (
                  <h4 className=" mt-80">pas de prescription</h4>
               )}
            </div>
         )}
      </>
   );
};
