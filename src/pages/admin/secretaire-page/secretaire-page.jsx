import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/api";

import Modal from "../../../components/utils/modal__1/modal__1.component";
import defaultImageProfile from "../../../assets/images/default-img-profile.jpg";

import "./secretaire-page.styles.scss";
import ReactPaginate from "react-paginate";
import UpdatePassword from "../components/UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import MyDataTable from "../../../components/utils/my-data-table/my-data-table";
import {
   ajouterSecretaire,
   deleteSecretaire,
   updateSecretaire,
} from "../../../redux/secretaire/secretaire.actions";

function SecretairePage() {
   const [filteredData, setFilteredData] = useState([]);
   const [operation, setOperation] = useState("");

   const [previewImage, setPreviewImage] = useState(defaultImageProfile);

   const SecretaireData = useSelector((state) => state.secretaire);
   const dispatch = useDispatch();

   const cinInput = useRef();
   const emailInput = useRef();

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

   useEffect(() => {
      setFilteredData(SecretaireData);
   }, [SecretaireData]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const idUtilisateur = formData.get("idUtilisateur");
      if (idUtilisateur) {
         fetch(BASE_URL + "/api/secretaire/put.php", {
            method: "post",
            body: formData,
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               dispatch(updateSecretaire(data));
               initializeForm();
            })
            .catch((err) => {});
      } else {
         fetch(BASE_URL + "/api/secretaire/post.php", {
            method: "post",
            body: formData,
         })
            .then((res) => {
               if (res.status === 200) {
                  return res.json();
               } else {
                  throw Error;
               }
            })
            .then((data) => {
               dispatch(ajouterSecretaire(data));

               initializeForm();
            })
            .catch((err) => {});
      }

      validation(formData);
   };

   const onAjoute = () => {
      setOperation("ajouter");
      showModal();
   };

   const onDelete = (id) => {
      const resultat = window.confirm(
         "are you sure you want to delete this record"
      );
      if (resultat) {
         fetch(`${BASE_URL}/api/secretaire/delete.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
               dispatch(deleteSecretaire({ idUtilisateur: id }));
            });
      }
   };

   const onUpdate = (id) => {
      setOperation("modifier");

      setModalActive(true);

      const form = document.querySelector("#medecinForm");
      const medecin = SecretaireData.filter((p) => p.idUtilisateur === id)[0];

      setPreviewImage(BASE_URL + medecin.imageProfile);

      form.idUtilisateur.value = medecin.idUtilisateur;
      form.nom.value = medecin.nom;
      form.prenom.value = medecin.prenom;
      form.cin.value = medecin.cin;
      form.genre.value = medecin.genre;
      form.situationFamilliale.value = medecin.situationFamilliale;
      form.email.value = medecin.email;
      form.tel.value = medecin.tel;
      form.adresse.value = medecin.adresse;
      form.dateNaissance.value = medecin.dateNaissance;
   };

   const onSearch = (e) => {
      const mot = e.target.value;
      setFilteredData(
         SecretaireData.filter(
            (m) =>
               m.cin.toLowerCase().includes(mot.toLowerCase()) ||
               m.nom.toLowerCase().includes(mot.toLowerCase()) ||
               m.prenom.toLowerCase().includes(mot.toLowerCase())
         )
      );
   };

   const validation = (formData) => {
      if (
         SecretaireData.filter((m) => m.cin == formData.get("cin")).length !== 0
      ) {
         console.log("cin deja exist !");
         cinInput.current.classList.add("input__error");
      } else {
         cinInput.current.classList.remove("input__error");
      }

      if (
         SecretaireData.filter((m) => m.email == formData.get("email"))
            .length !== 0
      ) {
         console.log("email deja exist !");
         emailInput.current.classList.add("input__error");
      } else {
         emailInput.current.classList.remove("input__error");
      }
   };

   const initializeForm = () => {
      setModalActive(false);

      document
         .querySelectorAll(
            "#medecinForm input, #medecinForm textarea, #medecinForm select"
         )
         .forEach((elem) => {
            elem.value = "";
         });
      setPreviewImage(defaultImageProfile);
   };

   const showPreview = (e) => {
      if (e.target.files && e.target.files[0]) {
         setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
   };

   const columns = [
      {
         name: "cin",
         selector: (row) => row.cin,
         sortable: true,
         maxWidth: "150px",
      },
      {
         name: "profile",
         selector: (row) => (
            <div className="py-4">
               <img
                  className="h-20 w-20 object-cover rounded-full border"
                  src={BASE_URL + row.imageProfile}
                  alt=""
               />
            </div>
         ),
         sortable: true,
         maxWidth: "150px",

         style: {
            margin: "flex",
            justifyContent: "space-around",
         },
      },
      {
         name: "nom complet",
         selector: (row) => row.nom + " " + row.prenom,
         sortable: true,
      },
      {
         name: "",
         cell: (row) => (
            <>
               <UpdatePassword idUtilisateur={row.idUtilisateur} />
               <button onClick={() => onUpdate(row.idUtilisateur)}>
                  <i className="text-4xl far fa-edit edit__icon"></i>
               </button>
               <button onClick={() => onDelete(row.idUtilisateur)}>
                  <i className="text-4xl far fa-trash-alt delete__icon"></i>
               </button>
            </>
         ),
         width: "150px",
         style: {
            display: "flex",
            justifyContent: "space-around",
         },
      },
   ];
   return (
      <div className="p-8">
         <div className="flex justify-between mb-8">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="w-5 h-5 text-gray-500 fas fa-search"></i>
               </div>
               <input
                  type="text"
                  id="table-search"
                  onChange={onSearch}
                  className="search__input "
                  placeholder="Search for items"
               />
            </div>
            <div>
               <button onClick={onAjoute} className="button__1">
                  Ajouter
               </button>
            </div>
         </div>
         <hr />
         <br />
         <div>
            <MyDataTable
               columns={columns}
               data={filteredData}
               // defaultSortField="idElement"
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
                  id="medecinForm"
                  className="form__1"
                  onSubmit={handleSubmit}
               >
                  <div className="flex justify-center">
                     <div className="w-48 h-48 mb-8 relative">
                        <img
                           className="w-full h-full rounded-full object-cover border border-slate-300"
                           src={previewImage}
                           alt=""
                        />
                        <label
                           htmlFor="image-profile"
                           className="absolute -right-2 -bottom-2 cursor-pointer"
                        >
                           <i className="far fa-edit"></i>
                        </label>
                     </div>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={showPreview}
                        id="image-profile"
                        name="imageProfile"
                        hidden
                     />
                  </div>

                  <div className="flex gap-6 mb-4">
                     <input hidden type="number" name="idUtilisateur" />

                     <div className="w-full">
                        <label htmlFor="nom">nom :</label>
                        <input type="text" name="nom" placeholder="nom" />
                     </div>
                     <div className="w-full">
                        <label htmlFor="prenom">prenom :</label>
                        <input type="text" name="prenom" placeholder="prenom" />
                     </div>
                  </div>
                  <div className="flex gap-6 mb-4">
                     <div className="w-full">
                        <label htmlFor="dateNaissance">
                           date de naissance :
                        </label>
                        <input type="date" name="dateNaissance" />
                     </div>
                  </div>
                  <div className="flex gap-6 mb-4">
                     <div ref={cinInput} className="w-full form__group">
                        <label htmlFor="cin">cin :</label>
                        <input type="text" name="cin" placeholder="cin" />
                     </div>
                     <div className="w-full">
                        <label htmlFor="genre">genre :</label>
                        <select type="text" name="genre">
                           <option>homme</option>
                           <option>femme</option>
                        </select>
                     </div>
                     <div className="w-full">
                        <label htmlFor="situationFamilliale">
                           situation familliale :
                        </label>
                        <select type="text" name="situationFamilliale">
                           <option>marie</option>
                           <option>celibataire</option>
                           <option>Divorce</option>
                           <option>pacse</option>
                           <option>veuf</option>
                        </select>
                     </div>
                  </div>
                  <div ref={emailInput} className="w-full form__group">
                     <label htmlFor="email">email :</label>
                     <input type="text" name="email" placeholder="email" />
                  </div>
                  {operation === "ajouter" && (
                     <div className="w-full">
                        <label htmlFor="motDePasse">mot de passe :</label>
                        <input
                           type="password"
                           name="motDePasse"
                           placeholder="motDePasse"
                           required
                        />
                     </div>
                  )}
                  <div className="w-full">
                     <label htmlFor="tel">tel :</label>
                     <input type="text" name="tel" placeholder="tel" />
                  </div>
                  <div className="w-full">
                     <label htmlFor="adresse">adresse :</label>
                     <textarea
                        name="adresse"
                        rows="6"
                        placeholder="adresse"
                     ></textarea>
                  </div>
                  <button className="button__1" type="submit">
                     {operation}
                  </button>
               </form>
            </div>
         </Modal>
      </div>
   );
}

export default SecretairePage;
