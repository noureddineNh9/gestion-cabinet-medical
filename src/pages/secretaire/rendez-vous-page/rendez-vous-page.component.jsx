import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../api/api";
import DropdownList from "../../../components/utils/dropdown-list/dropdown-list.component";
import Modal from "../../../components/utils/modal__1/modal__1.component";
import MyDataTable from "../../../components/utils/my-data-table/my-data-table";
import { setNotificationOn } from "../../../redux/notification/notification.actions";
import {
   deleteRendezVous,
   setRendezVous,
   updateRendezVous,
} from "../../../redux/rendez-vous/rendez-vous.actions";

import "./rendez-vous-page.styles.scss";

const RendezVousList = ({ RendezVousList, onUpdate, onDelete }) => {
   const [filteredItems, setFilteredItems] = useState([]);

   useEffect(() => {
      setFilteredItems(RendezVousList);
   });

   const columns = [
      {
         name: "patient",
         selector: (row) => row.nomPatient,
         sortable: true,
      },
      {
         name: "medecin",
         selector: (row) => row.nomMedecin,
         sortable: true,
      },
      {
         name: "type",
         selector: (row) => row.type,
         sortable: true,
      },
      {
         name: "date de RDV",
         selector: (row) => row.dateRDV,
         sortable: true,
      },
      {
         name: "",
         cell: (row) => (
            <>
               <button onClick={() => onUpdate(row)}>
                  <i className="text-4xl far fa-edit edit__icon"></i>
               </button>
               <button onClick={() => onDelete(row.idRDV)}>
                  <i className="text-4xl far fa-trash-alt delete__icon"></i>
               </button>
            </>
         ),
         width: "120px",
         style: {
            display: "flex",
            justifyContent: "space-around",
         },
      },
   ];

   return (
      <MyDataTable
         columns={columns}
         data={filteredItems}
         // defaultSortField="idElement"
         striped
         pagination
      />
   );
};

function RendezVousPage() {
   const [modalActive, setModalActive] = useState(false);

   const [medecinSelected, setMedecinSelected] = useState(null);
   const [patientSelected, setPatientSelected] = useState(null);

   const [rdvEnAttente, setRdvEnAttente] = useState([]);
   const [rdvConfirme, setRdvConfirme] = useState([]);
   const [rdvTermine, setRdvTermine] = useState([]);

   const MedecinData = useSelector((state) => state.medecin);
   const PatientData = useSelector((state) => state.patient);

   const RendezVousData = useSelector((state) => state.rendezVous);

   const formElement = useRef();
   const dispatch = useDispatch();

   const showModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };
   const hideModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };

   useEffect(() => {
      const collapseitems = document.querySelectorAll(
         "#collapse-list .collapse-item"
      );

      const collapseDesc = document.querySelectorAll(
         "#collapse-list .collapse-desc"
      );

      collapseitems.forEach((c) => {
         c.addEventListener("click", (e) => {
            collapseDesc.forEach((desc) => {
               if (desc.getAttribute("data-id") === e.target.id) {
                  desc.classList.toggle("hidden");
               }
            });
         });
      });
   }, []);

   useEffect(() => {
      setRdvEnAttente(RendezVousData.filter((r) => r.status == "enAttente"));
      setRdvConfirme(RendezVousData.filter((r) => r.status == "confirme"));
      setRdvTermine(RendezVousData.filter((r) => r.status == "termine"));
   }, [RendezVousData]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(formElement.current);
      formData.append("idPatient", patientSelected.id);
      formData.append("idMedecin", medecinSelected.id);

      console.log(Object.fromEntries(formData));

      if (!formData.get("idRDV")) {
         //ajouter
         try {
            const res = await fetch(BASE_URL + "/api/rendez-vous/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               console.log(data);
               dispatch(setRendezVous(data));

               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "RDV crée",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      } else {
         //modifier
         try {
            const res = await fetch(BASE_URL + "/api/rendez-vous/put.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               console.log(data);
               dispatch(updateRendezVous(data));

               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "RDV modifié",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const initializeForm = () => {
      formElement.current.idRDV.value = "";
      formElement.current.type.value = "";
      formElement.current.status.value = "";
      formElement.current.dateRDV.value = "";

      setMedecinSelected(null);
      setPatientSelected(null);
   };

   const onAjoute = () => {
      initializeForm();
      showModal();
   };

   const onUpdate = (rdv) => {
      formElement.current.idRDV.value = rdv.idRDV;
      formElement.current.type.value = rdv.type;
      formElement.current.status.value = rdv.status;
      formElement.current.dateRDV.value = rdv.dateRDV.replace(" ", "T");

      setMedecinSelected({ id: rdv.idMedecin, value: rdv.nomMedecin });
      setPatientSelected({ id: rdv.idPatient, value: rdv.nomPatient });

      showModal();
   };

   const onDelete = async (id) => {
      try {
         const res = await fetch(
            BASE_URL + "/api/rendez-vous/delete.php?id=" + id
         );

         if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            dispatch(deleteRendezVous({ idRDV: id }));

            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "RDV supprimé",
               })
            );
            hideModal();
         }
      } catch (error) {}
   };
   return (
      <div className="">
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
            <div>
               <button className="button__1" onClick={onAjoute}>
                  Ajouter un RDV
               </button>
            </div>
         </div>
         <hr />
         <br />
         {/* <div>
            <table className="table__1 ">
               <thead>
                  <tr>
                     <th>nom de patient</th>
                     <th>num de tel</th>
                     <th>date</th>
                     <th>medecin</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>amine koulali</td>
                     <td>062345678</td>
                     <td>12-06-2022 15:00</td>
                     <td>Dr. flan</td>
                     <td>
                        <div className="flex justify-around items-end">
                           <button>
                              <i className="text-4xl far fa-edit edit__icon"></i>
                           </button>
                           <button>
                              <i className="text-4xl far fa-trash-alt delete__icon"></i>
                           </button>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div> */}
         <div id="collapse-list">
            <h3 id="111" className="collapse-item title__1 mb-8">
               Rendez-vous confirmé
            </h3>
            <div data-id="111" className="collapse-desc">
               <div className="shadow-sm">
                  <RendezVousList
                     RendezVousList={rdvConfirme}
                     onUpdate={onUpdate}
                     onDelete={onDelete}
                  />
               </div>
               <hr />
               <br />
            </div>
            <h3 id="222" className="collapse-item title__1 mb-8">
               Rendez-vous en attente
            </h3>
            <div data-id="222" className="collapse-desc">
               <div className="shadow-sm">
                  <RendezVousList
                     RendezVousList={rdvEnAttente}
                     onUpdate={onUpdate}
                     onDelete={onDelete}
                  />
               </div>
               <hr />
               <br />
            </div>
            <h3 id="333" className="collapse-item title__1 mb-8">
               Rendez-vous en terminé
            </h3>
            <div data-id="333" className="collapse-desc">
               <div className="shadow-sm">
                  <RendezVousList
                     RendezVousList={rdvTermine}
                     onUpdate={onUpdate}
                     onDelete={onDelete}
                  />
               </div>
               <hr />
               <br />
            </div>
         </div>

         {/* *******************************  Modal  *************************************** */}

         <Modal
            closeModal={hideModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <form
                  ref={formElement}
                  className="form__1"
                  onSubmit={handleSubmit}
               >
                  <input type="number" name="idRDV" hidden />
                  <div className="w-full">
                     <label htmlFor="email">patient :</label>
                     <DropdownList
                        values={PatientData.map((i) => ({
                           id: i.idUtilisateur,
                           value: `${i.nom} ${i.prenom}`,
                        }))}
                        selectedValue={patientSelected}
                        setSelectedValue={setPatientSelected}
                     />
                  </div>
                  <div className="w-full">
                     <label htmlFor="email">medecin :</label>
                     <DropdownList
                        values={MedecinData.map((i) => ({
                           id: i.idUtilisateur,
                           value: `${i.nom} ${i.prenom}`,
                        }))}
                        selectedValue={medecinSelected}
                        setSelectedValue={setMedecinSelected}
                     />
                  </div>

                  <div className="flex gap-6 mb-4">
                     <div className="max-w-md">
                        <label>type :</label>
                        <select name="type">
                           <option>visite</option>
                           <option>controle</option>
                        </select>
                     </div>
                  </div>

                  <div className="flex gap-6 mb-4">
                     <div className="max-w-md">
                        <label>status :</label>
                        <select name="status">
                           <option>enAttente</option>
                           <option>confirme</option>
                           <option>termine</option>
                        </select>
                     </div>
                  </div>

                  <div className="flex gap-6 mb-4">
                     <div className="max-w-md">
                        <label htmlFor="dateRDV">date :</label>
                        <input type="datetime-local" name="dateRDV" />
                     </div>
                  </div>

                  <button className="button__1" type="submit">
                     Ajouter
                  </button>
               </form>
            </div>
         </Modal>
      </div>
   );
}

export default RendezVousPage;
