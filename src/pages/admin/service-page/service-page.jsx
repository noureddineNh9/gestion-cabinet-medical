import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { BASE_URL } from "../../../api/api";
import Modal from "../../../components/utils/modal__1/modal__1.component";

function ServicePage() {
   const [filteredItems, setFilteredItems] = useState([]);
   const [Operation, setOperation] = useState("Ajouter");

   const formElement = useRef();

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
         name: "idService",
         selector: (row) => row.idService,
         sortable: true,
      },
      {
         name: "nom",
         selector: (row) => row.nom,
         sortable: true,
      },
      {
         name: "",
         cell: (row) => (
            <>
               <button onClick={() => onModifier(row)}>
                  <i className="text-4xl far fa-edit edit__icon mr-4"></i>
               </button>
               <button onClick={() => onDelete(row.idService)}>
                  <i className="text-4xl far fa-trash-alt delete__icon"></i>
               </button>
            </>
         ),
      },
   ];

   useEffect(() => {
      fetch(BASE_URL + "/api/service/getAll.php")
         .then((res) => res.json())
         .then((data) => {
            setFilteredItems(data);
         });
   }, []);

   const initializeForm = () => {
      formElement.current.idService.value = "";
      formElement.current.nom.value = "";
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      if (formData.get("idService") == "") {
         //ajouter
         try {
            const res = await fetch(BASE_URL + "/api/service/post.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               console.log(data);
               setFilteredItems([...filteredItems, data]);
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
      showModal();
      initializeForm();
   };

   const onModifier = (ele) => {
      console.log(ele);
      formElement.current.idService.value = ele.idService;
      formElement.current.nom.value = ele.nom;
      showModal();
   };

   const onDelete = async (id) => {
      try {
         const res = await fetch(BASE_URL + "/api/service/delete.php?id=" + id);

         if (res.status === 200) {
            setFilteredItems(filteredItems.filter((i) => i.idService != id));
         }
      } catch (error) {
         console.log("erreur");
      }
   };

   return (
      <div className="p-8">
         <div className="flex justify-between mb-8">
            <div className="relative"></div>
            <div>
               <button onClick={onAjoute} className="button__1">
                  Ajouter
               </button>
            </div>
         </div>
         <hr />
         <br />
         <DataTable
            title="services"
            columns={columns}
            data={filteredItems}
            defaultSortField="nom"
            striped
            pagination
            subHeader
         />

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
                  <input hidden type="number" name="idService" />
                  <div className="w-full">
                     <label htmlFor="nom">nom :</label>
                     <input type="text" name="nom" placeholder="nom" />
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

export default ServicePage;
