import { combineReducers } from "redux";
import CompteRenduReducer from "./compteRendu/compteRendu.reducer";

import ConsultationReducer from "./consultation/consultation.reducer";
import ElementSanteReducer from "./elementSante/elementSante.reducer";
import ExamenReducer from "./examen/examen.reducer";
import MedecinReducer from "./medecin/medecin.reducer";
import PatientReducer from "./patient/patient.reducer";
import PrescriptionReducer from "./prescription/prescription.reducer";

import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
   user: UserReducer,
   patient: PatientReducer,
   medecin: MedecinReducer,
   elementSante: ElementSanteReducer,
   consultation: ConsultationReducer,
   prescription: PrescriptionReducer,
   compteRendu: CompteRenduReducer,
   examen: ExamenReducer,
});

export default rootReducer;
