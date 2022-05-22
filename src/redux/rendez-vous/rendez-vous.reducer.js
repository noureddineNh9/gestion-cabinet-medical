const INITIAL_STATE = [];

const RendezVousReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_RENDEZ_VOUS_DATA":
         return action.payload;
      case "SET_RENDEZ_VOUS":
         return [...state, action.payload];
      case "UPDATE_RENDEZ_VOUS":
         return state.map((r) =>
            r.idRDV == action.payload.idRDV ? action.payload : r
         );
      case "DELETE_RENDEZ_VOUS":
         return state.filter((r) => r.idRDV != action.payload.idRDV);
      default:
         return state;
   }
};

export default RendezVousReducer;
