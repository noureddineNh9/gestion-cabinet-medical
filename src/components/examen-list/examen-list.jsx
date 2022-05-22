import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";
import {
   addExamen,
   deleteDocument,
   deleteExamen,
   updateExamen,
} from "../../redux/examen/examen.action";
import { setNotificationOn } from "../../redux/notification/notification.actions";
import Modal from "../utils/modal__1/modal__1.component";

function ExamenList({ idConsultation }) {
   const [NbDocuments, setNbDocuments] = useState(1);
   const dispatch = useDispatch();
   const formElement = useRef();
   const collapseList = useRef();

   const examens = useSelector((state) =>
      state.examen.filter((c) => c.idConsultation == idConsultation)
   );

   const initializeForm = () => {
      formElement.current
         .querySelectorAll("input, textarea")
         .forEach((elem) => {
            elem.value = "";
         });

      formElement.current.idConsultation.value = idConsultation;
   };

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
      const collapseElement = collapseList.current;
      const collapseitems = collapseElement.querySelectorAll(".collapse-item");

      const collapseDesc = collapseElement.querySelectorAll(".collapse-desc");

      // collapseDesc.forEach((desc) => {
      //    desc.classList.add("hidden");
      // });
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

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(formElement.current);
      const json = Object.fromEntries(formData);

      if (!formData.get("idExamen")) {
         try {
            const res = await fetch(BASE_URL + "/api/examen/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(addExamen(data));
               dispatch(
                  setNotificationOn({ time: 3000, message: "examen ajouté" })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      } else {
         try {
            const res = await fetch(BASE_URL + "/api/examen/put.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(updateExamen(data));
               dispatch(
                  setNotificationOn({ time: 3000, message: "examen modifié" })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const onAjouterExamen = () => {
      showModal();
   };

   const onUpdateExamen = (examen) => {
      formElement.current.idExamen.value = examen.idExamen;
      formElement.current.nom.value = examen.nom;
      formElement.current.type.value = examen.type;
      formElement.current.description.value = examen.description;

      showModal();
   };

   const onDeleteExamen = async (id) => {
      try {
         const res = await fetch(BASE_URL + "/api/examen/delete.php?id=" + id);

         if (res.status === 200) {
            dispatch(deleteExamen({ idExamen: id }));
            dispatch(
               setNotificationOn({ time: 3000, message: "examen supprimé" })
            );
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const onDeleteDocument = async (idDocument, idExamen) => {
      try {
         const res = await fetch(
            BASE_URL + "/api/document/delete.php?id=" + idDocument
         );

         if (res.status === 200) {
            dispatch(deleteDocument({ idExamen, idDocument }));
            dispatch(
               setNotificationOn({ time: 3000, message: "document supprimé" })
            );
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const increaseNbDocuments = () => {
      setNbDocuments(NbDocuments + 1);
   };

   const decreaseNbDocuments = () => {
      if (NbDocuments > 1) {
         setNbDocuments(NbDocuments - 1);
      }
   };

   return (
      <div ref={collapseList}>
         {/************************ les examens ************************ */}

         <div className="flex items-center  mb-8">
            <h3 id="3" className="collapse-item title__1 w-full">
               les examens
            </h3>
            <button className="button__3" onClick={onAjouterExamen}>
               ajouter
            </button>
         </div>
         <div data-id="3" className="collapse-desc ">
            <table className="table__1 mb-16">
               <thead>
                  <tr>
                     <th>nom</th>
                     <th>documents</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {examens.map((e) => (
                     <tr key={e.idExamen}>
                        <td className="flex max-w-md">{e.nom}</td>
                        <td>
                           {e.documents.map((d) => (
                              <div
                                 key={d.idDocument}
                                 className="flex justify-between items-center mb-3 bg-gray-100 px-4 py-3 rounded-md"
                              >
                                 <div className="">
                                    <a href={BASE_URL + d.url} target="_blank">
                                       <i className="text-3xl text-gray-700 far fa-file-alt mr-3"></i>
                                    </a>
                                    {d.nom}
                                 </div>
                                 <button
                                    onClick={() =>
                                       onDeleteDocument(
                                          d.idDocument,
                                          d.idExamen
                                       )
                                    }
                                    className="text-4xl text-gray-500"
                                 >
                                    &#x2715;
                                 </button>
                              </div>
                           ))}
                        </td>

                        <td>
                           <div className="flex justify-around items-end">
                              <button onClick={() => onUpdateExamen(e)}>
                                 {/* <i className="text-4xl fas fa-eye edit__icon"></i> */}
                                 <i className="text-4xl far fa-edit edit__icon"></i>
                              </button>
                              <button
                                 onClick={() => onDeleteExamen(e.idExamen)}
                              >
                                 <i className="text-4xl far fa-trash-alt delete__icon"></i>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <hr />
            <br />
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
                     name="idConsultation"
                     defaultValue={idConsultation}
                     hidden
                  />
                  <input type="number" name="idExamen" hidden />
                  <div className="w-full">
                     <label htmlFor="nom">nom d'examen :</label>
                     <input type="text" name="nom" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="type">type d'examen :</label>
                     <input type="text" name="type" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="description">description :</label>
                     <textarea name="description" rows={4}></textarea>
                  </div>
                  <div className="w-full">
                     <div className="flex mb-4 items-center">
                        <label>nombre de document </label>
                        <div className="">
                           <button
                              type="button"
                              onClick={decreaseNbDocuments}
                              className="px-4 pb-1 text-4xl mx-4 border"
                           >
                              -
                           </button>
                           <span>{NbDocuments}</span>
                           <button
                              type="button"
                              onClick={increaseNbDocuments}
                              className="px-4 pb-1 text-4xl mx-4 border"
                           >
                              +
                           </button>
                        </div>
                     </div>
                     <hr />
                     <br />

                     {[...Array(NbDocuments)].map((e, i) => (
                        <div key={i}>
                           <label htmlFor="">document {i + 1}</label>
                           <input type="text" name={`nomFichiers[]`} />
                           <input type="file" name={`fichiers[]`} />
                           <hr />
                           <br />
                        </div>
                     ))}
                  </div>
                  <br />
                  <button className="button__1" type="submit">
                     Submit
                  </button>
               </form>
            </div>
         </Modal>
      </div>
   );
}

export default ExamenList;
