import React, { useEffect, useState } from "react";
import "./consultation.styles.scss";

const Index = () => {
   return (
      <>
         <h3 className="mb-16">Consultation du 25/11/2020 à 09h00</h3>
         <form className="form__2">
            <div className="input__group">
               <label htmlFor="">date de consultation : </label>
               <input type="text" />
            </div>
            <div className="input__group">
               <label htmlFor="">Docteur :</label>
               <input type="text" />
            </div>
            <div className="input__group">
               <label htmlFor="">Titre de consultation :</label>
               <input type="text" />
            </div>
            <br />
            <hr />
            <br />
            <div className="input__group">
               <label htmlFor="">Taille en cm :</label>
               <input type="text" />
            </div>
            <div className="input__group">
               <label htmlFor="">Poids en kg :</label>
               <input type="text" />
            </div>
            <div className="input__group">
               <label htmlFor="">Remarques :</label>
               <textarea name="remarques" id="" rows="10"></textarea>
            </div>
         </form>
      </>
   );
};

const Diagnostique = () => {
   return <h1>Diagnostique</h1>;
};

const Prescription = () => {
   useEffect(() => {
      const collapseTitle = document.querySelectorAll(
         "#collapse-list .medicament__title"
      );

      const collapseDesc = document.querySelectorAll(
         "#collapse-list .medicament__desc"
      );

      collapseDesc.forEach((desc) => {
         desc.classList.add("hidden");
      });

      collapseTitle.forEach((c) => {
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

   return (
      <>
         <form className="form__2">
            <h3 className="mb-8">list des médicaments</h3>

            <ul id="collapse-list" className="medicament__list">
               <div id="1" className="medicament__title">
                  médicament 1
               </div>
               <div data-id="1" className="medicament__desc">
                  <div className="input__group">
                     <label htmlFor="">nom de médicament : </label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">description de traitement :</label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">durée de traitement :</label>
                     <input type="text" />
                  </div>
               </div>

               <div id="2" className="medicament__title">
                  médicament 2
               </div>
               <div data-id="2" className="medicament__desc">
                  <div className="input__group">
                     <label htmlFor="">nom de médicament : </label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">description de traitement :</label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">durée de traitement :</label>
                     <input type="text" />
                  </div>
               </div>

               <div id="3" className="medicament__title">
                  médicament 3
               </div>
               <div data-id="3" className="medicament__desc">
                  <div className="input__group">
                     <label htmlFor="">nom de médicament : </label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">description de traitement :</label>
                     <input type="text" />
                  </div>
                  <div className="input__group">
                     <label htmlFor="">durée de traitement :</label>
                     <input type="text" />
                  </div>
               </div>
            </ul>

            <br />
            <hr />
            <br />
            <div className="input__group">
               <label htmlFor="">conseils medicaux :</label>
               <textarea name="" id="" cols="30" rows="4"></textarea>
            </div>
         </form>
      </>
   );
};

function Consultation(props) {
   console.log(props.match.params.id);

   const [Route, setRoute] = useState("index");

   const changeRoute = (route, e) => {
      setRoute(route);
      const navLinks = document.querySelectorAll(".navbar__1 .link");

      navLinks.forEach((link) => {
         link.classList.remove("active");
      });
      e.target.classList.add("active");
   };

   return (
      <div>
         <nav className="navbar__1">
            <a className="link active" onClick={(e) => changeRoute("index", e)}>
               Consultation
            </a>
            <a className="link" onClick={(e) => changeRoute("diagnostique", e)}>
               Diagnostique
            </a>
            <a className="link" onClick={(e) => changeRoute("prescription", e)}>
               Prescription
            </a>
         </nav>
         {Route === "index" ? (
            <Index />
         ) : Route === "diagnostique" ? (
            <Diagnostique />
         ) : Route === "prescription" ? (
            <Prescription />
         ) : (
            <></>
         )}
      </div>
   );
}

export default Consultation;
