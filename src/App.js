import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/login/login.component";
import secretaireRoute from "./routes/secretaireRoute";
import adminRoute from "./routes/adminRoute";
import MedecinRoute from "./routes/medecinRoute";

import { setPatientsData } from "./redux/patient/patient.actions";
import { setElementsSanteData } from "./redux/elementSante/elementSante.actions";
import { setConsultationData } from "./redux/consultation/consultation.action";
import { setMedecinData } from "./redux/medecin/medecin.actions";

import {
   COMPTE_RENDU_DATA,
   CONSULTATION_DATA,
   ELEMENT_SANTE_DATA,
   EXAMEN_DATA,
   MEDECIN_DATA,
   PRESCRIPTION_DATA,
} from "./data";
import PATIENTS_DATA from "./redux/patient/patients-data";

import "./styles/tailwind.css";
import "./styles/main.scss";
import { setCompteRenduData } from "./redux/compteRendu/compteRendu.actions";
import { setPrescriptionData } from "./redux/prescription/prescription.actions";
import { setExamenData } from "./redux/examen/examen.action";
import NotFound from "./pages/not-found/not-found";
import { Redirect } from "react-router-dom";
import Loading from "./components/utils/loading/loading";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { setCurrentUser } from "./redux/user/user.actions";
import { BASE_URL } from "./api/api";

function App() {
   const [isLoading, setIsLoading] = useState(true);
   const dispatch = useDispatch();

   // * load user from local storage

   const user = useSelector((state) => state.user);

   useEffect(() => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage) {
         dispatch(setCurrentUser(userFromLocalStorage));
      }
   }, []);

   useEffect(() => {
      if (user.currentUser) {
         setIsLoading(true);
         loadData().then(() => {
            setIsLoading(false);
         });
      } else {
         setIsLoading(false);
      }
   }, [user]);
   const loadData = () => {
      return new Promise((resolve) => {
         setTimeout(async () => {
            try {
               const res = await fetch(BASE_URL + "/api/patient/getAll.php");
               if (res.status === 200) {
                  const patientData = await res.json();
                  dispatch(setPatientsData(patientData));
               } else {
                  throw new Error();
               }
            } catch (error) {
               console.log(error);
            }

            // get tous les elements santés
            dispatch(setElementsSanteData(ELEMENT_SANTE_DATA));

            // get tous les consultation
            dispatch(setConsultationData(CONSULTATION_DATA));

            //
            dispatch(setPrescriptionData(PRESCRIPTION_DATA));

            // get tous les consultation
            dispatch(setCompteRenduData(COMPTE_RENDU_DATA));

            // get tous les consultation
            dispatch(setExamenData(EXAMEN_DATA));

            // get tous les medecin
            dispatch(setMedecinData(MEDECIN_DATA));
            resolve();
         }, 2500);
      });
   };

   return (
      <div className="">
         {isLoading ? (
            <Loading />
         ) : (
            <Switch>
               <Route
                  exact
                  path="/"
                  render={() => {
                     if (user.currentUser) {
                        if (user.type === "medecin") {
                           return <Redirect to="/medecin" />;
                        } else if (user.type === "secretaire") {
                           return <Redirect to="/secretaire" />;
                        }
                     } else {
                        return <Redirect to="/login" />;
                     }
                  }}
               />
               <Route
                  exact
                  path="/login"
                  render={() => {
                     if (user.currentUser) {
                        return <Redirect to="/" />;
                     } else {
                        return <Login />;
                     }
                  }}
               />
               <ProtectedRoute
                  path="/secretaire"
                  type="secretaire"
                  component={secretaireRoute}
               />
               <Route path="/admin" component={adminRoute} />
               <ProtectedRoute
                  path="/medecin"
                  type="medecin"
                  component={MedecinRoute}
               />

               <Route path="*" component={NotFound} />
            </Switch>
         )}
      </div>
   );
}

export default App;
