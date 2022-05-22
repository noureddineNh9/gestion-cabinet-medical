import React from "react";
import { Switch, Route } from "react-router-dom";
import DossierPatient from "../components/dossier-patient/dossier-patient.component";
import Sidebar from "../pages/medecin/Sidebar";
import HomePage from "../pages/medecin/home-page/home-page.component";
import RendezVous from "../pages/medecin/rendez-vous/rendez-vous";
import Profile from "../pages/medecin/profile/profile";
import Consultations from "../pages/medecin/consultations/consultations";
import Consultation from "../components/consultation/consultation.component";
import { useSelector } from "react-redux";
import UpdatePasswordPage from "../components/UpdatePasswordPage";

function MedecinRoute() {
   const currentMedecin = useSelector((state) => state.user.currentUser);
   return (
      <div className="secretaire">
         <Switch>
            <Route path="/medecin/dossier/:id" component={DossierPatient} />
            <Route>
               <Sidebar />
               <div className="content p-8">
                  <Switch>
                     <Route exact path="/medecin" component={HomePage} />
                     <Route exact path="/medecin/profile" component={Profile} />
                     <Route
                        exact
                        path="/medecin/rendez-vous"
                        component={RendezVous}
                     />
                     <Route
                        exact
                        path="/medecin/consultations"
                        component={Consultations}
                     />
                     <Route
                        path={`/medecin/consultations/:id`}
                        component={Consultation}
                     />
                     <Route
                        path={`/medecin/modifier-motDePasse`}
                        component={() => (
                           <UpdatePasswordPage
                              idUtilisateur={currentMedecin.idUtilisateur}
                           />
                        )}
                     />
                  </Switch>
               </div>
            </Route>
         </Switch>
      </div>
   );
}

export default MedecinRoute;
