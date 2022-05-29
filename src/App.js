import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/login/login.component";
import secretaireRoute from "./routes/secretaireRoute";
import adminRoute from "./routes/adminRoute";
import MedecinRoute from "./routes/medecinRoute";

import { setPatientsData } from "./redux/patient/patient.actions";
import { setElementsSanteData } from "./redux/elementSante/elementSante.actions";
import { setConsultationData } from "./redux/consultation/consultation.action";
import { setMedecinData } from "./redux/medecin/medecin.actions";

import { MEDECIN_DATA } from "./data";
import PATIENTS_DATA from "./redux/patient/patients-data";

import "./styles/tailwind.css";
import "./styles/main.scss";
import { setCompteRenduData } from "./redux/compteRendu/compteRendu.actions";
import { setPrescriptionData } from "./redux/prescription/prescription.actions";
import { setExamenData } from "./redux/examen/examen.action";
import NotFound from "./pages/not-found/not-found";
import Loading from "./components/utils/loading/loading";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { setCurrentUser } from "./redux/user/user.actions";
import { BASE_URL } from "./api/api";
import Notification from "./components/utils/notification/notification";
import { setNotificationOff } from "./redux/notification/notification.actions";
import { setSecretaireData } from "./redux/secretaire/secretaire.actions";

import Cookies from "js-cookie";
import { setRendezVousData } from "./redux/rendez-vous/rendez-vous.actions";
import { setAntecedentData } from "./redux/antecedent/antecedent.actions";
import PatientRoute from "./routes/patientRoute";
import { setServiceData } from "./redux/service/service.actions";

function App() {
   const [isLoading, setIsLoading] = useState(true);
   const dispatch = useDispatch();

   // * load user from local storage

   const user = useSelector((state) => state.user);
   const notification = useSelector((state) => state.notification);

   useEffect(() => {
      if (notification.active) {
         setTimeout(() => {
            dispatch(setNotificationOff());
         }, notification.time);
      }
   }, [notification]);

   useEffect(() => {
      // const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      // if (userFromLocalStorage) {
      //    dispatch(setCurrentUser(userFromLocalStorage));
      // }

      const idSession = localStorage.getItem("idSession");

      if (idSession) {
         const formData = new FormData();
         formData.append("idSession", idSession);
         fetch(BASE_URL + "/api/isAuth.php", {
            method: "POST",
            body: formData,
         })
            .then((res) => {
               if (res.status === 200) {
                  return res.json();
               } else {
                  throw new Error();
               }
            })
            .then((data) => {
               console.log(data);
               dispatch(setCurrentUser({ currentUser: data, type: data.type }));
            })
            .catch((err) => {
               setIsLoading(false);
            });
      } else {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      console.log(user);
      if (user.currentUser) {
         setIsLoading(true);
         loadData().then(() => {
            setIsLoading(false);
         });
      }
   }, [user]);
   const loadData = () => {
      return new Promise(async (resolve) => {
         //les patients
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

         //les secretaires
         try {
            const res = await fetch(BASE_URL + "/api/secretaire/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setSecretaireData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // get tous les medecin
         try {
            const res = await fetch(BASE_URL + "/api/medecin/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setMedecinData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }
         // get tous les elements santés
         try {
            const res = await fetch(BASE_URL + "/api/element-sante/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setElementsSanteData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // get tous les consultation
         try {
            const res = await fetch(BASE_URL + "/api/consultation/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setConsultationData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         //les prescriptions
         try {
            const res = await fetch(BASE_URL + "/api/prescription/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setPrescriptionData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // les comptes rendu
         try {
            const res = await fetch(BASE_URL + "/api/compte-rendu/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setCompteRenduData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // get tous les consultation
         try {
            const res = await fetch(BASE_URL + "/api/examen/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setExamenData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // Avoir tout les rendez vous
         try {
            const res = await fetch(BASE_URL + "/api/rendez-vous/getAll.php");
            if (res.status === 200) {
               const data = await res.json();
               dispatch(setRendezVousData(data));
            } else {
               throw new Error();
            }
         } catch (error) {
            console.log(error);
         }

         // getAll Antecedants
         try {
            const rep = await fetch(BASE_URL + "/api/antecedent/getAll.php");

            if (rep.status === 200) {
               const data = await rep.json();
               dispatch(setAntecedentData(data));
            }
         } catch (error) {
            console.log(error);
         }

         // getAll Services
         try {
            const rep = await fetch(BASE_URL + "/api/service/getAll.php");

            if (rep.status === 200) {
               const data = await rep.json();
               dispatch(setServiceData(data));
            }
         } catch (error) {
            console.log(error);
         }
         resolve();
      });
   };

   return (
      <div className="">
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <Notification
                  message={notification.message}
                  type={notification.type}
                  className={notification.active && "active"}
               />

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
                           } else if (user.type === "patient") {
                              return <Redirect to="/patient" />;
                           } else if (user.type === "admin") {
                              return <Redirect to="/admin" />;
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
                  <ProtectedRoute
                     path="/medecin"
                     type="medecin"
                     component={MedecinRoute}
                  />
                  <ProtectedRoute
                     path="/patient"
                     type="patient"
                     component={PatientRoute}
                  />

                  <Route path="/admin" component={adminRoute} />

                  <Route path="*" component={NotFound} />
               </Switch>
            </>
         )}
      </div>
   );
}

export default App;
