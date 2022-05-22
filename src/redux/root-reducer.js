import { combineReducers } from "redux";
import AntecedentReducer from "./antecedent/antecedent.reducer";
import CompteRenduReducer from "./compteRendu/compteRendu.reducer";

import ConsultationReducer from "./consultation/consultation.reducer";
import ElementSanteReducer from "./elementSante/elementSante.reducer";
import ExamenReducer from "./examen/examen.reducer";
import MedecinReducer from "./medecin/medecin.reducer";
import NotificationReducer from "./notification/notification.reducer";
import PatientReducer from "./patient/patient.reducer";
import PrescriptionReducer from "./prescription/prescription.reducer";
import RendezVousReducer from "./rendez-vous/rendez-vous.reducer";
import SecretaireReducer from "./secretaire/secretaire.reducer";
import ServiceReducer from "./service/service.reducer";

import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
   user: UserReducer,
   patient: PatientReducer,
   antecedent: AntecedentReducer,
   medecin: MedecinReducer,
   service: ServiceReducer,
   secretaire: SecretaireReducer,
   elementSante: ElementSanteReducer,
   consultation: ConsultationReducer,
   prescription: PrescriptionReducer,
   compteRendu: CompteRenduReducer,
   examen: ExamenReducer,
   rendezVous: RendezVousReducer,

   notification: NotificationReducer,
});

export default rootReducer;
