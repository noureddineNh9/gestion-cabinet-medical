const INITIAL_STATE = [];

const ServiceReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_SERVICE_DATA":
         return action.payload;
      case "AJOUTER_SERVICE":
         return [...state, action.payload];
      case "UPDATE_SERVICE":
         return state.map((s) => {
            if (s.idService == action.payload.idService) {
               return action.payload;
            } else {
               return s;
            }
         });
      case "DELETE_SERVICE":
         return state.filter((s) => s.idService != action.payload.idService);
      default:
         return state;
   }
};
export default ServiceReducer;
