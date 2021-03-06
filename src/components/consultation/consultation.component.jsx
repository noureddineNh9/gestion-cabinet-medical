import { useEffect, useRef, useState } from "react";
import "./consultation.styles.scss";

import { useDispatch, useSelector } from "react-redux";
import { Diagnostique } from "../diagnostique/diagnostique";
import { Prescription } from "../prescription/prescription";
import { modifierConsultation } from "../../redux/consultation/consultation.action";
import { useRouteMatch } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import { setNotificationOn } from "../../redux/notification/notification.actions";

const Index = ({ consultation, userType }) => {
   const dispatch = useDispatch();

   const formElement = useRef();

   useEffect(() => {
      if (userType !== "medecin") {
         formElement.current
            .querySelectorAll("input, textarea, select")
            .forEach((elem) => {
               elem.disabled = true;
            });
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
         const res = await fetch(BASE_URL + "/api/consultation/put.php", {
            method: "post",
            body: formData,
         });

         if (res.status === 200) {
            dispatch(modifierConsultation(Object.fromEntries(formData)));
            dispatch(
               setNotificationOn({
                  time: 3000,
                  message: "modification avec success",
               })
            );
         } else {
            throw Error;
         }
      } catch (error) {}
   };

   return (
      <>
         <h3 className="mb-16">{`Consultation du ${consultation.dateCreation} `}</h3>
         <form ref={formElement} className="form__2" onSubmit={handleSubmit}>
            <input
               name="idConsultation"
               type="number"
               defaultValue={consultation.idConsultation}
               hidden
            />

            <div className="input__group">
               <label htmlFor="">Medecin :</label>
               <input
                  type="text"
                  defaultValue={`${consultation.medecin.nom} ${consultation.medecin.prenom}`}
                  disabled
               />
            </div>
            <br />
            <br />
            <hr />
            <br />
            <div className="input__group">
               <label htmlFor="">Motif de consultation :</label>
               <textarea
                  name="motif"
                  id=""
                  rows="4"
                  defaultValue={consultation.motif}
               ></textarea>
            </div>
            <div className="input__group">
               <label htmlFor="hauteur">Taille en cm :</label>
               <input
                  name="hauteur"
                  type="text"
                  defaultValue={consultation.hauteur}
               />
            </div>
            <div className="input__group">
               <label htmlFor="">Poids en kg :</label>
               <input
                  name="poid"
                  type="text"
                  defaultValue={consultation.poid}
               />
            </div>
            <div className="input__group">
               <label htmlFor="">Remarques :</label>
               <textarea
                  name="remarques"
                  id=""
                  rows="10"
                  defaultValue={consultation.remarques}
               ></textarea>
            </div>
            {userType === "medecin" && (
               <div>
                  <button className="button__1">Enregister</button>
               </div>
            )}
         </form>
      </>
   );
};

function Consultation() {
   const match = useRouteMatch();
   const idConsultation = match.params.id;

   var userType = useSelector((state) => state.user.type);

   const idUtilisateur = useSelector(
      (state) => state.user.currentUser.idUtilisateur
   );

   const [Route, setRoute] = useState("index");
   const [isLoading, setIsLoading] = useState(true);

   const consultation = useSelector((state) => {
      let consultation = state.consultation.filter(
         (con) => con.idConsultation == idConsultation
      )[0];

      if (!consultation) {
         return null;
      }

      let medecin = state.medecin.filter(
         (m) => m.idUtilisateur == consultation.idMedecin
      )[0];
      return { ...consultation, medecin };
   });

   if (userType === "medecin" && idUtilisateur !== consultation.idMedecin) {
      userType = "patient";
   }

   useEffect(() => {
      if (consultation) {
         setIsLoading(false);
      }
   }, []);

   const changeRoute = (route, e) => {
      setRoute(route);
      const navLinks = document.querySelectorAll(".navbar__1 .link");

      navLinks.forEach((link) => {
         link.classList.remove("active");
      });
      e.target.classList.add("active");
   };

   return (
      <>
         {!isLoading && (
            <div>
               <nav className="navbar__1">
                  {(userType === "medecin" || userType === "patient") && (
                     <a
                        className="link active"
                        onClick={(e) => changeRoute("index", e)}
                     >
                        Consultation
                     </a>
                  )}

                  <a
                     className="link"
                     onClick={(e) => changeRoute("diagnostique", e)}
                  >
                     Diagnostique
                  </a>

                  {(userType === "medecin" || userType === "patient") && (
                     <a
                        className="link"
                        onClick={(e) => changeRoute("prescription", e)}
                     >
                        Prescription
                     </a>
                  )}
               </nav>
               {Route === "index" ? (
                  (userType === "medecin" || userType === "patient") && (
                     <Index consultation={consultation} userType={userType} />
                  )
               ) : Route === "diagnostique" ? (
                  <Diagnostique
                     idConsultation={consultation.idConsultation}
                     userType={userType}
                  />
               ) : Route === "prescription" ? (
                  (userType === "medecin" || userType === "patient") && (
                     <Prescription
                        idConsultation={consultation.idConsultation}
                        userType={userType}
                     />
                  )
               ) : (
                  <></>
               )}
            </div>
         )}
      </>
   );
}

export default Consultation;
