import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/modal__1/modal__1.component";
import { deleteMedicament } from "../../redux/prescription/prescription.actions";

export const Prescription = ({ idConsultation }) => {
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
      initializeForm();
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
         c.addEventListener("click", (e) => {
            collapseDesc.forEach((desc) => {
               if (desc.getAttribute("data-id") === e.target.id) {
                  desc.classList.toggle("hidden");
               } else {
                  desc.classList.add("hidden");
               }
            });
         });
      });
   }, []);

   const initializeForm = () => {
      formElement.current
         .querySelectorAll("input, textarea")
         .forEach((elem) => {
            elem.value = "";
         });

      formElement.current.idPrescription.value = prescription.idPrescription;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(formElement.current);
   };

   const onAjouterMedicament = () => {
      setButtonValue("ajouter");
      showModal();
   };

   const onUpdateMedicament = (id) => {
      let medicament = prescription.medicaments.filter(
         (m) => m.idMedicament == id
      )[0];

      formElement.current.idMedicament.value = medicament.idMedicament;

      formElement.current.nom.value = medicament.nom;
      formElement.current.descriptionTraitement.value =
         medicament.descriptionTraitement;
      formElement.current.duree.value = medicament.duree;

      setButtonValue("modifier");
      showModal();
   };

   const onDeleteMedicament = (id) => {
      const confirm = window.confirm("Vous voulez vraiment le supprimer ?");
      if (confirm) {
         //delete from database
         // ......

         dispatch(
            deleteMedicament({
               idMedicament: id,
               idPrescription: prescription.idPrescription,
            })
         );
      }
   };

   return (
      <>
         <div className="form__2">
            <div className="flex items-center mb-8">
               <h3 className=" w-full">list des médicaments</h3>

               <button className="button__3" onClick={onAjouterMedicament}>
                  ajouter
               </button>
            </div>

            <ul id="collapse-list" className="medicament__list">
               {prescription.medicaments.map((m) => (
                  <div key={m.idMedicament}>
                     <div
                        id={m.idMedicament}
                        className="collapse-item medicament__title flex justify-between"
                     >
                        <p>{m.nom}</p>

                        <div>
                           <button
                              className="ml-4"
                              onClick={() => onUpdateMedicament(m.idMedicament)}
                           >
                              {/* <i className="text-4xl fas fa-eye edit__icon"></i> */}
                              <i className="text-4xl far fa-edit edit__icon"></i>
                           </button>
                           <button
                              className="ml-4"
                              onClick={() => onDeleteMedicament(m.idMedicament)}
                           >
                              <i className="text-4xl far fa-trash-alt delete__icon"></i>
                           </button>
                        </div>
                     </div>
                     <div
                        data-id={m.idMedicament}
                        className="collapse-desc medicament__desc"
                     >
                        <div className="input__group">
                           <label htmlFor="">nom de médicament : </label>
                           <input type="text" defaultValue={m.nom} />
                        </div>
                        <div className="input__group">
                           <label htmlFor="">description de traitement :</label>
                           <textarea
                              name=""
                              id=""
                              cols="30"
                              rows="4"
                              defaultValue={m.descriptionTraitement}
                           ></textarea>
                        </div>
                        <div className="input__group">
                           <label htmlFor="">durée de traitement :</label>
                           <input type="text" defaultValue={m.duree} />
                        </div>
                     </div>
                  </div>
               ))}
            </ul>

            <br />
            <hr />
            <br />
            <div className="input__group">
               <label htmlFor="">conseils medicaux :</label>
               <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  defaultValue={prescription.conseilsMedicaux}
               ></textarea>
            </div>
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
                  />
                  <input type="number" name="idMedicament" />
                  <div className="w-full">
                     <label htmlFor="nom">nom de médicament :</label>
                     <input type="text" name="nom" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="descriptionTraitement">
                        description de traitement :
                     </label>
                     <textarea name="descriptionTraitement" rows={4}></textarea>
                  </div>
                  <div className="w-full">
                     <label htmlFor="duree">durée de traitement :</label>
                     <input type="text" name="duree" />
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
   );
};
