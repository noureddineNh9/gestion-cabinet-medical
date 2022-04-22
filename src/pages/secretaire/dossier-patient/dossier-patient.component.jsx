import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import defaultImageProfile from "../../../assets/images/default-img-profile.jpg";
import Consultation from "../components/consultation/consultation.component";
import ElementSantePage from "../element-sante-page/element-sante-page.component";

const DossierAdministratif = () => {
   const [previewImage, setPreviewImage] = useState(defaultImageProfile);

   const showPreview = (e) => {
      if (e.target.files && e.target.files[0]) {
         setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
   };
   return (
      <div>
         <form id="patientForm" className="form__2">
            <div className="flex justify-center mb-12">
               <div className="w-48 h-48 mb-8 relative">
                  <img
                     className="w-full h-full rounded-full object-cover border border-black"
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

            <div className="input__group">
               <label htmlFor="nom">Nom :</label>
               <input type="text" name="nom" />
            </div>

            <div className="input__group">
               <label htmlFor="prenom">Prenom :</label>
               <input type="text" name="prenom" />
            </div>
            <div className="input__group">
               <label htmlFor="cne">cin :</label>
               <input type="text" name="cne" />
            </div>
            <div className="input__group">
               <label htmlFor="genre">Genre :</label>
               <div>
                  <input
                     type="radio"
                     name="genre"
                     value="homme"
                     className="mr-2"
                  />
                  <span className="mr-4">homme</span>
                  <input
                     type="radio"
                     name="genre"
                     value="femme"
                     className="mr-2"
                  />
                  <span>femme</span>
               </div>
            </div>
            <div className="input__group">
               <label htmlFor="situationFamilliale">
                  Situation familliale :
               </label>
               <select type="text" name="situationFamilliale">
                  <option>marie</option>
                  <option>celibataire</option>
                  <option>Divorce</option>
                  <option>pacse</option>
                  <option>veuf</option>
               </select>
            </div>
            <div className="input__group">
               <label htmlFor="email">Email :</label>
               <input type="text" name="email" />
            </div>
            <div className="input__group">
               <label htmlFor="motDePasse">Mot de passe :</label>
               <input type="password" name="motDePasse" />
            </div>
            <div className="input__group">
               <label htmlFor="tel">Tel :</label>
               <input type="text" name="tel" />
            </div>
            <div className="input__group">
               <label htmlFor="tel">Ville :</label>
               <input type="text" name="ville" />
            </div>
            <div className="input__group">
               <label htmlFor="adresse">Adresse :</label>
               <textarea name="adresse" rows="6"></textarea>
            </div>
            <br />
            <hr />
            <br />
            <div className="input__group flex items-center">
               <label htmlFor="">
                  <span>&#9888;</span> Patient décédé :
               </label>
               <input type="checkbox" />
            </div>
            <div className="input__group"></div>

            <button className="button__2" type="submit">
               Modifier
            </button>
         </form>
      </div>
   );
};

const DossierMedical = () => {
   const [previewImage, setPreviewImage] = useState(defaultImageProfile);

   const showPreview = (e) => {
      if (e.target.files && e.target.files[0]) {
         setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
   };
   return <div>Informations Medicaux</div>;
};

function DossierPatientPage(props) {
   useEffect(() => {
      const navLinks = document.querySelectorAll(
         "#dossier-sidebar .menu .link"
      );

      navLinks.forEach((link) => {
         link.addEventListener("click", (e) => {
            navLinks.forEach((link) => {
               link.classList.remove("active");
            });
            console.log("aze");
            e.target.classList.add("active");
         });
      });
   }, []);

   return (
      <div>
         <div id="dossier-sidebar" className="sidebar h-screen">
            <div className="p-8 mb-16">
               <h3 className="text-center font-semibold mb-12">
                  Dossier Patient
               </h3>
               <h5 className="text-center font-semibold mb-2">Nom et prenom</h5>
               <h6 className="text-center font-semibold">Age : 25 ans</h6>
            </div>
            <ul className="menu">
               <li>
                  <Link to={`${props.match.url}`} className="link active">
                     Dossier Administratif
                  </Link>
               </li>
               <li>
                  <Link to={`${props.match.url}/medical`} className="link">
                     Informations Medicaux
                  </Link>
               </li>
               <li>
                  <Link to={`${props.match.url}/medical`} className="link">
                     Antécédents
                  </Link>
               </li>
               <li>
                  <a className="link">Elements Santés</a>
                  <ul className="dropdown__list">
                     <Link to={`${props.match.url}/12`} className="link">
                        Element santé 1
                     </Link>
                     <Link to={`${props.match.url}/165`} className="link">
                        Element santé 2
                     </Link>
                     <Link to={`${props.match.url}/43`} className="link">
                        Element santé 3
                     </Link>
                  </ul>
               </li>
            </ul>
         </div>
         <div className="content p-8">
            <Switch>
               <Route
                  exact
                  path={`${props.match.url}`}
                  component={DossierAdministratif}
               />

               <Route
                  exact
                  path={`${props.match.url}/medical`}
                  component={DossierMedical}
               />
               <Route
                  path={`${props.match.url}/:id`}
                  component={ElementSantePage}
               />
            </Switch>
         </div>
      </div>
   );
}

export default DossierPatientPage;
