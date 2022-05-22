const INITIAL_STATE = [];

const SecretaireReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_SECRETAIRE_DATA":
         return action.payload;
      case "AJOUTER_SECRETAIRE":
         return [...state, action.payload];

      case "UPDATE_SECRETAIRE":
         return state.map((m) => {
            if (m.idUtilisateur == action.payload.idUtilisateur) {
               return action.payload;
            } else {
               return m;
            }
         });
      case "DELETE_SECRETAIRE":
         return state.filter(
            (m) => m.idUtilisateur != action.payload.idUtilisateur
         );
      default:
         return state;
   }
};

export default SecretaireReducer;
