const INITIAL_STATE = [];

const PrescriptionReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_PRESCRIPTION_DATA":
         return action.payload;
      case "DELETE_MEDICAMENT":
         return state.map((p) => {
            if (p.idPrescription === action.payload.idPrescription) {
               return {
                  ...p,
                  medicaments: p.medicaments.filter(
                     (m) => m.idMedicament != action.payload.idMedicament
                  ),
               };
            } else {
               return p;
            }
         });
      default:
         return state;
   }
};
export default PrescriptionReducer;
