const INITIAL_STATE = [];

const CompteRenduReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_COMPTE_RENDU_DATA":
         return action.payload;
      case "SET_COMPTE_RENDU":
         return [...state, action.payload];
      case "UPDATE_COMPTE_RENDU":
         return state.map((c) =>
            c.idCompteRendu == action.payload.idCompteRendu ? action.payload : c
         );
      case "DELETE_COMPTE_RENDU":
         return state.filter(
            (c) => c.idCompteRendu != action.payload.idCompteRendu
         );

      case "SET_AUDIO":
         return state.map((c) => {
            if (c.idCompteRendu == action.payload.idCompteRendu) {
               return { ...c, audio: action.payload };
            } else {
               return c;
            }
         });
      case "DELETE_AUDIO":
         return state.map((c) => {
            if (c.audio && c.audio.idAudio == action.payload.idAudio) {
               return { ...c, audio: null };
            } else {
               return c;
            }
         });
      case "DELETE_FICHIER":
         return state.map((c) => {
            if (c.idCompteRendu == action.payload.idCompteRendu) {
               return { ...c, url: null };
            } else {
               return c;
            }
         });

      default:
         return state;
   }
};
export default CompteRenduReducer;
