import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../components/utils/modal__1/modal__1.component";
import {
   deleteFichier,
   updateCompteRendu,
} from "../../../redux/compteRendu/compteRendu.actions";
import { BASE_URL } from "../../../api/api";
import { setNotificationOn } from "../../../redux/notification/notification.actions";
import { selectCompteRenduBySecretaire } from "../../../redux/compteRendu/elementSante.selectors";

function CompteRenduList({ idConsultation, comptesRenduData }) {
   const compteRenduForm = useRef();
   const collapseList = useRef();

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

   const onConsulteCompteRendu = async (compteRendu) => {
      compteRenduForm.current.idCompteRendu.value = compteRendu.idCompteRendu;
      compteRenduForm.current.nom.value = compteRendu.nom;
      compteRenduForm.current.type.value = compteRendu.type;
      compteRenduForm.current.description.value = compteRendu.description;

      showModal();
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
                  {comptesRenduData.map((c) => (
                     <tr key={c.idCompteRendu}>
                        <td>{c.nom}</td>
                        <td className="w-48 h-32">
                           <div className="flex">
                              {c.audio && (
                                 <>
                                    <audio
                                       className=""
                                       controls
                                       src={BASE_URL + c.audio.url}
                                    ></audio>
                                 </>
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
                              <button onClick={() => onConsulteCompteRendu(c)}>
                                 <i className="text-4xl far fa-eye edit__icon"></i>
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
               <form className="form__1" ref={compteRenduForm}>
                  <input
                     type="number"
                     name="idConsultation"
                     defaultValue={idConsultation}
                     hidden
                  />
                  <input type="number" name="idCompteRendu" hidden />
                  <div className="w-full">
                     <label htmlFor="nom">nom de compte rendu :</label>
                     <input type="text" name="nom" disabled />
                  </div>
                  <div className="w-full">
                     <label htmlFor="type">type :</label>
                     <input type="text" name="type" disabled />
                  </div>
                  <div className="w-full">
                     <label htmlFor="email">description :</label>
                     <textarea name="description" rows={4} disabled></textarea>
                  </div>
                  <hr />
                  <br />
               </form>

               <br />
            </div>
         </Modal>
      </div>
   );
}

function DiagnistiqueAudioPage() {
   const [modalActive, setModalActive] = useState(false);

   const [compteRenduEnAttente, setCompteRenduEnAttente] = useState([]);
   const [compteRenduComplete, setCompteRenduComplete] = useState([]);

   const showModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };
   const hideModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };
   const currentUser = useSelector((state) => state.user.currentUser);

   const comptesRenduData = useSelector((state) =>
      selectCompteRenduBySecretaire(state, currentUser.idUtilisateur)
   );

   useEffect(() => {
      setCompteRenduEnAttente(comptesRenduData.filter((c) => !c.url));
      setCompteRenduComplete(comptesRenduData.filter((c) => c.url));
   }, [comptesRenduData]);

   return (
      <div className="">
         <h2 className="title__1">En Attente</h2>
         <br />
         <div className="flex justify-between mb-8">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
               </div>
               <input
                  type="text"
                  id="table-search"
                  className="search__input"
                  placeholder="Search for items"
               />
            </div>
         </div>
         <hr />
         <br />
         <div className="mb-12">
            <CompteRenduList comptesRenduData={compteRenduEnAttente} />
         </div>

         <h2 className="title__1">Completé</h2>

         <br />
         <div className="flex justify-between mb-8">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
               </div>
               <input
                  type="text"
                  id="table-search"
                  className="search__input"
                  placeholder="Search for items"
               />
            </div>
         </div>
         <hr />
         <br />
         <div className="mb-12">
            <CompteRenduList comptesRenduData={compteRenduComplete} />
         </div>
      </div>
   );
}

export default DiagnistiqueAudioPage;
