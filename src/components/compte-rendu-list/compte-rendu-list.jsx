import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import audio1 from "../../assets/audio/audio1.mp3";
import Modal from "../utils/modal__1/modal__1.component";
import {
   deleteAudio,
   deleteCompteRendu,
   deleteFichier,
   setCompteRendu,
   updateCompteRendu,
} from "../../redux/compteRendu/compteRendu.actions";
import { BASE_URL } from "../../api/api";
import AjouterAudioButton from "../AjouterAudioButton";
import { setNotificationOn } from "../../redux/notification/notification.actions";

function CompteRenduList({ idConsultation }) {
   const compteRenduForm = useRef();
   const collapseList = useRef();

   const dispatch = useDispatch();

   const comptesRendu = useSelector((state) =>
      state.compteRendu.filter((c) => c.idConsultation == idConsultation)
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

   const initializeForm = () => {
      compteRenduForm.current
         .querySelectorAll("input, textarea")
         .forEach((elem) => {
            elem.value = "";
         });
      compteRenduForm.current.idConsultation.value = idConsultation;
   };

   useEffect(() => {
      initializeForm();
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
      const compteRenduFormData = new FormData(compteRenduForm.current);

      if (compteRenduFormData.get("idCompteRendu")) {
         console.log("update");

         try {
            const res = await fetch(BASE_URL + "/api/compte-rendu/put.php", {
               method: "post",
               body: compteRenduFormData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(updateCompteRendu(data));
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "compte rendu modifié ",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      } else {
         try {
            const res = await fetch(BASE_URL + "/api/compte-rendu/post.php", {
               method: "post",
               body: compteRenduFormData,
            });

            if (res.status === 200) {
               const data = await res.json();
               hideModal();
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "compte rendu ajouté ",
                  })
               );
               dispatch(setCompteRendu(data));
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const onDeleteCompteRendu = async (id) => {
      const confirm = window.confirm("Vous voulez vraiment le supprimer ?");
      if (confirm) {
         try {
            const res = await fetch(
               BASE_URL + "/api/compte-rendu/delete.php?id=" + id
            );

            if (res.status === 200) {
               dispatch(deleteCompteRendu({ idCompteRendu: id }));
               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "supprimé avec succès",
                  })
               );
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const onUpdateCompteRendu = async (compteRendu) => {
      compteRenduForm.current.idCompteRendu.value = compteRendu.idCompteRendu;
      compteRenduForm.current.nom.value = compteRendu.nom;
      compteRenduForm.current.type.value = compteRendu.type;
      compteRenduForm.current.description.value = compteRendu.description;

      showModal();
   };

   const onAjouterCompteRendu = () => {
      showModal();
   };

   const onDeleteAudio = async (id) => {
      try {
         const res = await fetch(BASE_URL + "/api/audio/delete.php?id=" + id);

         if (res.status === 200) {
            dispatch(deleteAudio({ idAudio: id }));
            dispatch(
               setNotificationOn({ time: 3000, message: "audio supprimé" })
            );
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const onDeleteFichier = async (id) => {
      try {
         const res = await fetch(
            BASE_URL + "/api/compte-rendu/deleteFichier.php?id=" + id
         );

         if (res.status === 200) {
            dispatch(deleteFichier({ idCompteRendu: id }));
            dispatch(
               setNotificationOn({ time: 3000, message: "fichier supprimé" })
            );
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   const onAjouteFichier = async (e, idCompteRendu) => {
      const formData = new FormData();
      formData.append("idCompteRendu", idCompteRendu);
      formData.append("fichier", e.target.files[0]);

      console.log(Object.fromEntries(formData));
      try {
         const res = await fetch(
            BASE_URL + "/api/compte-rendu/ajouteFichier.php",
            {
               method: "post",
               body: formData,
            }
         );
         if (res.status === 200) {
            const data = await res.json();
            dispatch(updateCompteRendu(data));
            dispatch(
               setNotificationOn({ time: 3000, message: "fichier ajouté" })
            );
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   return (
      <div ref={collapseList}>
         {/************************ les comptes rendu ************************ */}
         <div className="flex items-center  mb-8">
            <h3 id="1" className="collapse-item title__1 w-full">
               les comptes rendu
            </h3>
            <button className="button__3" onClick={onAjouterCompteRendu}>
               ajouter
            </button>
         </div>
         <div data-id="1" className="collapse-desc ">
            <table className="table__1 mb-16">
               <thead>
                  <tr>
                     <th>nom</th>
                     <th>audio</th>
                     <th>document</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {comptesRendu.map((c) => (
                     <tr key={c.idCompteRendu}>
                        <td>{c.nom}</td>
                        <td className=" h-32">
                           <div className="flex">
                              {c.audio ? (
                                 <>
                                    <audio
                                       className=""
                                       controls
                                       src={BASE_URL + c.audio.url}
                                    ></audio>
                                    <button
                                       onClick={() =>
                                          onDeleteAudio(c.audio.idAudio)
                                       }
                                       className="text-4xl text-gray-800 ml-4"
                                    >
                                       &#x2715;
                                    </button>
                                 </>
                              ) : (
                                 <span>
                                    <AjouterAudioButton
                                       className="lien"
                                       idCompteRendu={c.idCompteRendu}
                                    />
                                 </span>
                              )}
                           </div>
                        </td>
                        <td>
                           {c.url ? (
                              <>
                                 <a href={BASE_URL + c.url} target="_blank">
                                    <i className="text-5xl text-gray-700 far fa-file-alt"></i>
                                 </a>
                                 <button
                                    onClick={() =>
                                       onDeleteFichier(c.idCompteRendu)
                                    }
                                    className="text-4xl text-gray-800 ml-4"
                                 >
                                    &#x2715;
                                 </button>
                              </>
                           ) : (
                              <>
                                 {/* <i class="fas fa-file-upload mr-2 text-3xl"></i> */}
                                 <input
                                    type="file"
                                    onChange={(e) =>
                                       onAjouteFichier(e, c.idCompteRendu)
                                    }
                                    className="file__input w-60"
                                 />
                              </>
                           )}
                        </td>
                        <td>
                           <div className="flex justify-around items-end">
                              <button onClick={() => onUpdateCompteRendu(c)}>
                                 <i className="text-4xl far fa-edit edit__icon"></i>
                              </button>
                              <button
                                 onClick={() =>
                                    onDeleteCompteRendu(c.idCompteRendu)
                                 }
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

         {/* ******************************* Compte rendu Modal  *************************************** */}

         <Modal
            closeModal={hideModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <form
                  className="form__1"
                  ref={compteRenduForm}
                  onSubmit={handleSubmit}
               >
                  <input
                     type="number"
                     name="idConsultation"
                     defaultValue={idConsultation}
                     hidden
                  />
                  <input type="number" name="idCompteRendu" hidden />
                  <div className="w-full">
                     <label htmlFor="nom">nom de compte rendu :</label>
                     <input type="text" name="nom" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="type">type :</label>
                     <input type="text" name="type" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="email">description :</label>
                     <textarea name="description" rows={4}></textarea>
                  </div>
                  <hr />
                  <br />
                  <button className="button__1" type="submit">
                     Ajouter
                  </button>
               </form>

               <br />
            </div>
         </Modal>
      </div>
   );
}

export default CompteRenduList;
