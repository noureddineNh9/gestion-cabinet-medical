import React from "react";
import { Switch, Route } from "react-router-dom";
import DiagnistiqueAudioPage from "../pages/secretaire/diagnistique-audio-page/diagnistique-audio-page.component";

import HomePage from "../pages/secretaire/home-page/home-page.component";
import RendezVousPage from "../pages/secretaire/rendez-vous-page/rendez-vous-page.component";
import Sidebar from "../pages/secretaire/components/Sidebar";
import PatientList from "../pages/secretaire/patient-list/patient-list";
import DossierPatient from "../components/dossier-patient/dossier-patient.component";
import UpdatePasswordPage from "../components/UpdatePasswordPage";
import { useSelector } from "react-redux";

function SecretaireRoute() {
   const currentUser = useSelector((state) => state.user.currentUser);

   return (
      <div className="secretaire">
         <Switch>
            <Route path="/secretaire/patient/:id" component={DossierPatient} />
            <Route>
               <Sidebar />
               <div className="content p-8">
                  <Switch>
                     <Route exact path="/secretaire" component={HomePage} />
                     <Route
                        exact
                        path="/secretaire/patient"
                        component={PatientList}
                     />
                     <Route
                        exact
                        path="/secretaire/rendez-vous"
                        component={RendezVousPage}
                     />
                     <Route
                        exact
                        path="/secretaire/diagnistique-audio"
                        component={DiagnistiqueAudioPage}
                     />
                     <Route
                        path={`/secretaire/modifier-motDePasse`}
                        component={() => (
                           <UpdatePasswordPage
                              idUtilisateur={currentUser.idUtilisateur}
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

export default SecretaireRoute;
