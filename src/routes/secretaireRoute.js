import React from "react";
import { Switch, Route } from "react-router-dom";
import DiagnistiqueAudioPage from "../pages/secretaire/diagnistique-audio-page/diagnistique-audio-page.component";
import DossierPatientPage from "../pages/secretaire/dossier-patient/dossier-patient.component";

import HomePage from "../pages/secretaire/home-page/home-page.component";
import OrdonnancePage from "../pages/secretaire/ordonnance-page/ordonnance-page.component";
import PatientPage from "../pages/secretaire/patient-page/patient-page.component";
import RendezVousPage from "../pages/secretaire/rendez-vous-page/rendez-vous-page.component";
import Sidebar from "../pages/secretaire/components/Sidebar";
import ElementSantePage from "../pages/secretaire/element-sante-page/element-sante-page.component";

function SecretaireRoute() {
   return (
      <div className="secretaire">
         <Switch>
            <Route
               path="/secretaire/patient/:id"
               component={DossierPatientPage}
            />

            <Route>
               <Sidebar />
               <div className="content">
                  <Switch>
                     <Route exact path="/secretaire" component={HomePage} />
                     <Route
                        exact
                        path="/secretaire/patient"
                        component={PatientPage}
                     />
                     <Route
                        exact
                        path="/secretaire/rendez-vous"
                        component={RendezVousPage}
                     />
                     <Route
                        exact
                        path="/secretaire/ordonnance"
                        component={OrdonnancePage}
                     />
                     <Route
                        exact
                        path="/secretaire/diagnistique-audio"
                        component={DiagnistiqueAudioPage}
                     />
                  </Switch>
               </div>
            </Route>
         </Switch>
      </div>
   );
}

export default SecretaireRoute;
