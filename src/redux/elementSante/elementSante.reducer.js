const INITIAL_STATE = [];

const ElementSanteReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_ELEMENT_SANTE_DATA":
         return action.payload;
      default:
         return state;
   }
};
export default ElementSanteReducer;
