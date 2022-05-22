const INITIAL_STATE = [];

const ExamenReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_EXAMEN_DATA":
         return action.payload;
      case "ADD_EXAMEN":
         return [...state, action.payload];
      case "UPDATE_EXAMEN":
         return state.map((e) =>
            e.idExamen == action.payload.idExamen ? action.payload : e
         );
      case "DELETE_EXAMEN":
         return state.filter((c) => c.idExamen != action.payload.idExamen);
      case "DELETE_DOCUMENT":
         return state.map((e) => {
            if (e.idExamen == action.payload.idExamen) {
               return {
                  ...e,
                  documents: e.documents.filter(
                     (d) => d.idDocument != action.payload.idDocument
                  ),
               };
            } else {
               return e;
            }
         });
      default:
         return state;
   }
};
export default ExamenReducer;
