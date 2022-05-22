const INITIAL_STATE = [];

const MedecinReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_MEDECIN_DATA":
         return action.payload;
      case "AJOUTER_MEDECIN":
         return [...state, action.payload];

      case "UPDATE_MEDECIN":
         return state.map((m) => {
            if (m.idUtilisateur == action.payload.idUtilisateur) {
               return action.payload;
            } else {
               return m;
            }
         });
      case "DELETE_MEDECIN":
         return state.filter(
            (m) => m.idUtilisateur != action.payload.idUtilisateur
         );
      default:
         return state;
   }
};

export default MedecinReducer;
