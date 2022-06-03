import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import {
   ajouterConsultation,
   deleteConsultation,
} from "../../redux/consultation/consultation.action";
import { setNotificationOn } from "../../redux/notification/notification.actions";
import Modal from "../utils/modal__1/modal__1.component";
import MyDataTable from "../utils/my-data-table/my-data-table";

function ConsultationList({ idElement, consultations, mode }) {
   const [filteredItems, setFilteredItems] = useState([]);
   const [searchInputValue, setSearchInputValue] = useState("");
   const [Operation, setOperation] = useState("Ajouter");

   const match = useRouteMatch();
   const formElement = useRef();
   const filterForm = useRef();
   const dispatch = useDispatch();

   let medecinId = [];
   consultations.forEach((c) => {
      if (!medecinId.includes(c.idMedecin)) {
         medecinId.push(c.idMedecin);
      }
   });

   const medecinData = useSelector((state) =>
      state.medecin.filter((m) => {
         if (medecinId.includes(parseInt(m.idUtilisateur))) {
            return true;
         }
      })
   );

   const [modalActive, setModalActive] = useState(false);
   const showModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };

   const hideModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };

   const columns = [
      {
         name: "idConsultation",
         selector: (row) => row.idConsultation,
         sortable: true,
      },
      {
         name: "	type",
         selector: (row) => row.type,
         sortable: true,
      },
      {
         name: "dateCreation",
         selector: (row) => row.dateCreation,
         sortable: true,
      },
      {
         name: "Element Sante",
         selector: (row) => row.elementSante,
         sortable: true,
      },
      {
         name: "",
         cell: (row) => (
            <>
               <Link to={`${match.url}/${row.idConsultation}`} className="lien">
                  <i className="text-4xl far fa-eye edit__icon"></i>
               </Link>
               {mode !== "read" && (
                  <button onClick={() => onDelete(row.idConsultation)}>
                     <i className="text-4xl far fa-trash-alt delete__icon"></i>
                  </button>
               )}
            </>
         ),
         width: "120px",
         style: {
            display: "flex",
            justifyContent: "space-around",
         },
      },
   ];

   useEffect(() => {
      setFilteredItems(
         consultations.filter((m) =>
            m.dateCreation
               .toLowerCase()
               .includes(searchInputValue.toLowerCase())
         )
      );
   }, [searchInputValue, consultations]);

   const initializeForm = () => {
      setOperation("Ajouter");

      formElement.current.idConsultation.value = "";
      formElement.current.duree.value = "";
      formElement.current.type.value = "";
      formElement.current.motif.value = "";
      formElement.current.hauteur.value = "";
      formElement.current.poid.value = "";
      formElement.current.remarques.value = "";
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (formData.get("idConsultation") == "") {
         //ajouter
         try {
            const res = await fetch(BASE_URL + "/api/consultation/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(ajouterConsultation(data));

               dispatch(
                  setNotificationOn({
                     time: 3000,
                     message: "Consultation crée",
                  })
               );
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      } else {
         //modifier
         console.log("modifier");
      }
   };

   const onAjoute = () => {
      initializeForm();
      showModal();
   };

   const onDelete = async (id) => {
      const confirm = window.confirm("Vous voulez vraiment le supprimer ?");
      if (confirm) {
         try {
            const res = await fetch(
               BASE_URL + "/api/consultation/delete.php?id=" + id
            );
            if (res.status === 200) {
               dispatch(deleteConsultation({ idConsultation: id }));
               hideModal();
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   const appliquerFilter = () => {
      const filterData = Object.fromEntries(new FormData(filterForm.current));

      let Data = consultations;

      if (filterData.idMedecin) {
         Data = Data.filter((m) => m.idMedecin == filterData.idMedecin);
      }
      if (filterData.type) {
         Data = Data.filter((m) => m.type == filterData.type);
      }
      if (filterData.dateDebut) {
         Data = Data.filter(
            (m) =>
               new Date(m.dateCreation).getTime() >=
               new Date(filterData.dateDebut).getTime()
         );
      }
      if (filterData.dateFin) {
         Data = Data.filter(
            (m) =>
               new Date(m.dateCreation).getTime() <=
               new Date(filterData.dateFin).getTime()
         );
      }

      setFilteredItems(Data);
   };

   const annulerFilter = () => {
      setFilteredItems(consultations);
      filterForm.current.querySelectorAll("input, select").forEach((elem) => {
         elem.value = "";
      });
   };

   return (
      <div className="">
         <div className="md:flex justify-between items-center">
            <h2 className="title__1 w-full mb-6">Les consultations </h2>
            {mode !== "read" && (
               <div>
                  <button onClick={onAjoute} className="button__1 w-max">
                     Ajouter une consultation
                  </button>
               </div>
            )}
         </div>
         <br />
         <div className="flex justify-between mb-8">
            <div className="relative">
               {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
               </div>
               <input
                  type="text"
                  id="table-search"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  className="search__input "
                  placeholder="Search for items"
               /> */}
            </div>
         </div>
         <div className="mb-8">
            <form ref={filterForm} action="">
               <div className="grid grid-cols-4 gap-6 mb-8">
                  <div className="col-span-4 lg:col-span-2 w-full">
                     <label>date : </label>
                     <div className="sm:flex items-center">
                        <input
                           type="date"
                           name="dateDebut"
                           className="input__1 w-full"
                        />
                        <span className="mx-2">-</span>
                        <input
                           type="date"
                           name="dateFin"
                           className="input__1 w-full"
                        />
                     </div>
                  </div>

                  <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                     <label>type : </label>
                     <div className="flex items-center">
                        <select name="type" className="input__1 w-full">
                           <option></option>
                           <option>visite</option>
                           <option>controle</option>
                        </select>
                     </div>
                  </div>

                  <div className="col-span-4 sm:col-span-2 lg:col-span-1">
                     <label>medecin : </label>
                     <div className="flex items-center">
                        <select name="idMedecin" className="input__1 w-full">
                           <option></option>
                           {medecinData.map((m) => (
                              <option
                                 key={m.idUtilisateur}
                                 value={m.idUtilisateur}
                              >
                                 {m.nom + " " + m.prenom}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>
               </div>
            </form>

            <div className="flex justify-end">
               <div>
                  <button onClick={annulerFilter} className="button__8 mr-6">
                     Annuler
                  </button>
                  <button onClick={appliquerFilter} className="button__7">
                     Appliquer
                  </button>
               </div>
            </div>
         </div>
         <hr />
         <br />
         <div className="shadow-sm">
            <MyDataTable
               columns={columns}
               data={filteredItems}
               defaultSortField="idElement"
               striped
               pagination
            />
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
                  <input hidden type="number" name="idConsultation" />
                  <input
                     hidden
                     type="number"
                     name="idElement"
                     defaultValue={idElement}
                  />
                  <input
                     hidden
                     type="number"
                     name="idMedecin"
                     defaultValue={2}
                  />
                  <div className="w-full">
                     <label htmlFor="duree">duree :</label>
                     <input type="text" name="duree" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="type">type de consultation :</label>
                     <select type="text" name="type">
                        <option>visite</option>
                        <option>controle</option>
                     </select>
                  </div>
                  <div className="w-full">
                     <label htmlFor="motif">motif de consultation :</label>
                     <textarea rows={5} name="motif"></textarea>
                  </div>
                  <div className="w-full">
                     <label htmlFor="hauteur">hauteur (en cm) :</label>
                     <input type="text" name="hauteur" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="poid">poid (en kg) :</label>
                     <input type="text" name="poid" />
                  </div>

                  <div className="w-full">
                     <label htmlFor="remarques">remarques :</label>
                     <textarea rows={5} name="remarques"></textarea>
                  </div>
                  <button className="button__1" type="submit">
                     {Operation}
                  </button>
               </form>
            </div>
         </Modal>
      </div>
   );
   // const match = useRouteMatch();
   // //const [consultations, setConsultations] = useState([])

   // var consultations = useSelector((state) => state.consultation);

   // if (idElement) {
   //    consultations = consultations.filter((c) => c.idElement == idElement);
   // }

   // return (
   //    <div>
   //       <div className="flex justify-between mb-8">
   //          <div className="relative">
   //             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
   //                <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
   //             </div>
   //             <input
   //                type="text"
   //                id="table-search"
   //                className="search__input"
   //                placeholder="Search for items"
   //             />
   //          </div>
   //          <div>
   //             <button className="button__1">Ajouter</button>
   //          </div>
   //       </div>

   //       <hr />
   //       <br />
   //       <table className="table__1 mb-16">
   //          <thead>
   //             <tr>
   //                <th>id</th>
   //                <th>date</th>
   //                <th>type</th>
   //                <th></th>
   //             </tr>
   //          </thead>
   //          <tbody>
   //             {consultations.map((c, index) => (
   //                <tr key={c.idConsultation}>
   //                   <td>{c.idConsultation}</td>
   //                   <td>{c.date.toString()}</td>
   //                   <td>{c.type}</td>
   //                   <td>
   //                      <div className="flex justify-around items-end">
   //                         <Link
   //                            to={`${match.url}/${c.idConsultation}`}
   //                            className="lien"
   //                         >
   //                            consulter
   //                         </Link>
   //                      </div>
   //                   </td>
   //                </tr>
   //             ))}
   //          </tbody>
   //       </table>
   //    </div>
   // );
}

export default ConsultationList;
