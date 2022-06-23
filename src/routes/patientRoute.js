import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import DossierPatient from "../components/dossier-patient/dossier-patient.component";
import UpdatePasswordPage from "../components/UpdatePasswordPage";
import NotFound from "../pages/not-found/not-found";
import HomePage from "../pages/patient/home-page/home-page.component";
import RendezVous from "../pages/patient/rendez-vous/rendez-vous";
import Sidebar from "../pages/patient/Sidebar";

function PatientRoute() {
   const currentUser = useSelector((state) => state.user.currentUser);

   return (
      <div className="patient">
         <Switch>
            <Route path="/patient/dossier/:id" component={DossierPatient} />
            <Route>
               <Sidebar />
               <div className="content p-8">
                  <Switch>
                     <Route
                        exact
                        path="/patient"
                        render={() => <Redirect to="/patient/rendez-vous" />}
                     />
                     <Route
                        exact
                        path="/patient/rendez-vous"
                        component={RendezVous}
                     />
                     <Route
                        path={`/patient/modifier-motDePasse`}
                        component={() => (
                           <UpdatePasswordPage
                              idUtilisateur={currentUser.idUtilisateur}
                           />
                        )}
                     />
                     <Route path="*" component={NotFound} />
                  </Switch>
               </div>
            </Route>
         </Switch>
      </div>
   );
}

export default PatientRoute;
