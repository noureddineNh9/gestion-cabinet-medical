import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import { modifierElementSante } from "../../redux/elementSante/elementSante.actions";
import {
   setNotificationOff,
   setNotificationOn,
} from "../../redux/notification/notification.actions";
import ConsultationList from "../consultation-list/consultation-list";
import Consultation from "../consultation/consultation.component";
import { timeline } from "../../assets/timeline/src/js/timeline";

import "./element-sante.styles.scss";

import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

const Index = ({ match }) => {
   const dispatch = useDispatch();

   const idElement = match.params.id;
   const formElement = useRef();

   const userType = useSelector((state) => state.user.type);

   useEffect(() => {
      if (userType !== "medecin") {
         formElement.current
            .querySelectorAll("input, textarea, select")
            .forEach((elem) => {
               elem.disabled = true;
            });
      }

      timeline(document.querySelectorAll(".timeline"), {
         forceVerticalMode: 800,
         mode: "horizontal",
         visibleItems: 4,
      });
   }, []);

   const ElementSante = useSelector(
      (state) => state.elementSante.filter((e) => e.idElement == idElement)[0]
   );

   const consultations = useSelector((state) =>
      state.consultation
         .filter((c) => c.idElement == idElement)
         .sort((a, b) => b.idConsultation - a.idConsultation)
   );

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (userType === "medecin") {
         const formData = new FormData(e.target);
         const formJson = Object.fromEntries(formData);

         //ajouter
         try {
            const res = await fetch(BASE_URL + "/api/element-sante/put.php", {
               method: "post",
               body: formData,
            });

            if (res.status === 200) {
               const data = await res.json();
               dispatch(modifierElementSante({ ...ElementSante, ...formJson }));
               dispatch(
                  setNotificationOn({
                     message: "Modification avec success",
                     time: 3000,
                  })
               );
               // setTimeout(() => {
               //    dispatch(setNotificationOff());
               // }, 2000);
            }
         } catch (error) {
            console.log("erreur");
         }
      }
   };

   return (
      <>
         <div>
            <h2 className="title__1">Element Santé : {ElementSante.nom}</h2>
            <br />
            <form ref={formElement} className="form__2" onSubmit={handleSubmit}>
               <input
                  type="number"
                  name="idElement"
                  defaultValue={ElementSante.idElement}
                  hidden
               />
               <input
                  type="number"
                  name="idPatient"
                  defaultValue={ElementSante.idPatient}
                  hidden
               />
               <div className="flex items-start mb-12">
                  <label htmlFor="tel" className="w-48 font-extrabold">
                     nom :
                  </label>
                  <input
                     type="text"
                     name="nom"
                     defaultValue={ElementSante.nom}
                  />
               </div>
               <div className="flex items-start mb-12">
                  <label htmlFor="tel" className="w-48 font-extrabold">
                     creer on :
                  </label>
                  <input
                     type="date"
                     name="dateCreation"
                     defaultValue={ElementSante.dateCreation}
                     disabled
                  />
               </div>
               <div className="flex items-start">
                  <label htmlFor="adresse" className="w-48 font-extrabold">
                     description :
                  </label>
                  <textarea
                     name="description"
                     rows="6"
                     defaultValue={ElementSante.description}
                  ></textarea>
               </div>
               <br />
               {userType === "medecin" && (
                  <button className="button__1" type="submit">
                     Enregister
                  </button>
               )}
            </form>
         </div>

         <br />
         <hr className="" />
         <br />
         <br />

         <div class="timeline">
            <div class="timeline__wrap">
               <div class="timeline__items">
                  {consultations
                     .sort((a, b) => a.idConsultation - b.idConsultation)
                     .map((c, index) => (
                        <div key={c.idConsultation} className="timeline__item">
                           <div className="timeline__content">
                              <p className="text-gray-600 mb-2">{c.motif}</p>
                           </div>
                           <span className="date font-light text-slate-500 italic">
                              {c.dateCreation}
                           </span>
                        </div>
                     ))}
               </div>
            </div>
         </div>

         <br />
         <br />
         {/* 
         <div className="flex justify-end">
            <div>
               <div className="motif__container w-full lg:max-w-3xl px-8 mb-12">
                  <h3 className="mb-6 text-slate-500 font-semibold">
                     les motif des consultation
                  </h3>

                  {consultations.map((c, index) => (
                     <div
                        key={c.idConsultation}
                        className={`${
                           index !== consultations.length - 1 && "mb-8 border-b"
                        } p-2`}
                     >
                        <p className="text-gray-600 mb-2">{c.motif}</p>
                        <div className="flex justify-end  mb-2">
                           <span className="font-light text-slate-500 italic">
                              {c.dateCreation}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div> */}

         <ConsultationList
            idElement={idElement}
            consultations={consultations}
            mode={userType !== "medecin" && "read"}
         />
      </>
   );
};

function ElementSante() {
   const match = useRouteMatch();

   return (
      <div>
         <Switch>
            <Route
               exact
               path={`${match.url}`}
               component={() => <Index match={match} />}
            />

            <Route exact path={`${match.url}/:id`} component={Consultation} />
         </Switch>
      </div>
   );
}

export default ElementSante;
