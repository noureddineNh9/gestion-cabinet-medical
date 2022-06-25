import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../api/api";
import DropdownList from "../../../components/utils/dropdown-list/dropdown-list.component";
import Modal from "../../../components/utils/modal__1/modal__1.component";
import MyDataTable from "../../../components/utils/my-data-table/my-data-table";
import { setNotificationOn } from "../../../redux/notification/notification.actions";
import { selectRdvByPatient } from "../../../redux/rendez-vous/rendez-vous.selectors";
import {
   deleteRendezVous,
   setRendezVous,
   updateRendezVous,
} from "../../../redux/rendez-vous/rendez-vous.actions";

function RendezVous() {
   const currentUser = useSelector((state) => state.user.currentUser);

   const idPatient = currentUser.idUtilisateur;

   const [modalActive, setModalActive] = useState(false);

   const [medecinSelected, setMedecinSelected] = useState(null);

   const MedecinData = useSelector((state) => state.medecin);

   const RendezVousData = useSelector((state) =>
      selectRdvByPatient(state, idPatient).sort((a, b) => {
         console.log(b.dateRDV);
         return new Date(b.dateRDV).getTime() - new Date(a.dateRDV).getTime();
      })
   );
   console.log(RendezVousData);

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

   const columns = [
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
         name: "status",
         selector: (row) => row.status,
         sortable: true,
      },
      {
         name: "date de RDV",
         selector: (row) => row.dateRDV,
         sortable: true,
      },
      {
         name: "",
         cell: (row) =>
            row.status === "enAttente" && (
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

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(formElement.current);
      formData.append("idMedecin", medecinSelected.id);
      formData.append("status", "enAttente");
      formData.append("idPatient", idPatient);

      if (!formData.get("idRDV")) {
         //ajouter
         try {
            const res = await fetch(BASE_URL + "/api/rendez-vous/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
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
      formElement.current.dateRDV.value = "";

      setMedecinSelected(null);
   };

   const onAjoute = () => {
      initializeForm();
      showModal();
   };

   const onUpdate = (rdv) => {
      formElement.current.idRDV.value = rdv.idRDV;
      formElement.current.type.value = rdv.type;
      formElement.current.dateRDV.value = rdv.dateRDV.replace(" ", "T");

      setMedecinSelected({ id: rdv.idMedecin, value: rdv.nomMedecin });

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
         <h3 id="111" className="collapse-item title__1 mb-8">
            Mes Rendez-vous
         </h3>
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
                  Prendre un RDV
               </button>
            </div>
         </div>
         <hr />
         <br />

         <div id="collapse-list">
            <div data-id="111" className="collapse-desc">
               <div className="shadow-sm">
                  <MyDataTable
                     columns={columns}
                     data={RendezVousData}
                     // defaultSortField="idElement"
                     striped
                     pagination
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

export default RendezVous;
