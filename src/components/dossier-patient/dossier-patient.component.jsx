import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import NotFound from "../../pages/not-found/not-found";
import Antecedents from "../antecedents/antecedents.component";
import ConsultationList from "../consultation-list/consultation-list";

import Consultation from "../consultation/consultation.component";
import DossierAdministratif from "../dossier-administratif/dossier-administratif.component";
import ElementSanteList from "../element-sante-list/element-sante-list";
import ElementSante from "../element-sante/element-sante.component";
import PatientStatistique from "../patient-statistique/patient-statistique";

import "./dossier-patient.styles.scss";

function DossierPatient(props) {
   const match = useRouteMatch();
   const idPatient = match.params.id;

   const user = useSelector((state) => state.user);

   const patient = useSelector((state) => {
      return state.patient.filter((p) => p.idUtilisateur == idPatient)[0];
   });

   let consultations = useSelector((state) => state.consultation);

   consultations = useSelector((state) => {
      var list = new Array();
      state.elementSante.map((ele) => {
         if (ele.idPatient == idPatient) {
            list = [
               ...list,
               ...consultations.filter((c) => c.idElement == ele.idElement),
            ];
         }
      });
      return list;
   });

   useEffect(() => {
      if (!patient) {
         console.log("patient not exist");
         // redirect to not found page
      }
      const navLinks = document.querySelectorAll(
         "#dossier-sidebar .menu .link"
      );

      navLinks.forEach((link) => {
         link.addEventListener("click", (e) => {
            navLinks.forEach((link) => {
               link.classList.remove("active");
            });
            e.target.classList.add("active");
         });
      });
   }, []);

   return (
      <div>
         <div id="dossier-sidebar" className="sidebar h-screen">
            <div className="p-8">
               <Link to="/" className="lien__2">
                  <i className="far fa-hand-point-left"></i>page d'accueil
               </Link>
            </div>
            <div className="p-8 mb-16">
               <h3 className="text-center font-semibold mb-12">
                  Dossier Patient
               </h3>
               <h5 className="text-center font-semibold mb-2">{`${patient.nom} ${patient.prenom}`}</h5>
               <h6 className="text-center font-semibold">
                  {`Age : ${
                     new Date().getFullYear() -
                     new Date(patient.dateNaissance).getFullYear()
                  } ans`}
               </h6>
            </div>
            <ul className="menu">
               {(user.type === "medecin" || user.type === "patient") && (
                  <>
                     <li>
                        <Link to={`${match.url}/statistique`} className="link">
                           <i className="far fa-chart-bar"></i> Statistique
                        </Link>
                     </li>
                  </>
               )}

               <li>
                  <Link to={`${match.url}/administratif`} className="link">
                     <i className="fas fa-address-card"></i> Dossier
                     Administratif
                  </Link>
               </li>
               <li>
                  <Link to={`${match.url}/consultation`} className="link">
                     <i className="fas fa-notes-medical"></i> Consultations
                  </Link>
               </li>
               {(user.type === "medecin" || user.type === "patient") && (
                  <>
                     <li>
                        <Link to={`${match.url}/antecedents`} className="link">
                           <i className="fas fa-clone"></i> Antecedents
                        </Link>
                     </li>
                     <li>
                        <Link
                           to={`${match.url}/element-sante`}
                           className="link"
                        >
                           <i className="fas fa-book-medical"></i> Elements
                           santé
                        </Link>
                     </li>
                  </>
               )}
            </ul>
         </div>
         <div className="content p-8">
            <Switch>
               <Route
                  exact
                  path={`${match.url}/`}
                  component={() => <Redirect to={`${match.url}/statistique`} />}
               />
               <Route
                  exact
                  path={`${match.url}/administratif`}
                  component={() => (
                     <DossierAdministratif
                        patient={patient}
                        mode={user.type !== "secretaire" && "readOnly"}
                     />
                  )}
               />
               <Route
                  exact
                  path={`${match.url}/consultation`}
                  component={(props) => (
                     <ConsultationList
                        consultations={consultations}
                        mode="read"
                        {...props}
                     />
                  )}
               />
               <Route
                  path={`${match.url}/consultation/:id`}
                  component={Consultation}
               />

               {(user.type === "medecin" || user.type === "patient") && (
                  <>
                     <Route
                        exact
                        path={`${match.url}/antecedents`}
                        component={() => (
                           <Antecedents
                              idPatient={idPatient}
                              userType={user.type}
                           />
                        )}
                     />
                     <Route
                        exact
                        path={`${match.url}/statistique`}
                        component={() => (
                           <PatientStatistique
                              idPatient={idPatient}
                              consultations={consultations}
                           />
                        )}
                     />
                     <Route
                        exact
                        path={`${match.url}/element-sante`}
                        component={() => (
                           <ElementSanteList
                              idPatient={idPatient}
                              userType={user.type}
                           />
                        )}
                     />
                     <Route
                        path={`${match.url}/element-sante/:id`}
                        component={ElementSante}
                        userType={user.type}
                     />
                  </>
               )}
               <Route path="*" component={NotFound} />
            </Switch>
            <br />
            <br />
            <br />
         </div>
      </div>
   );
}

export default DossierPatient;
