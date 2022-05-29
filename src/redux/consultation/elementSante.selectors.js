import { createSelector } from "reselect";

export const selectConsultationByMedecin = createSelector(
   [(state) => state.compteRendu, (state, idSecretaire) => idSecretaire],
   (compteRendu, idSecretaire) =>
      compteRendu.filter(
         (c) =>
            c.audio /* && c.audio.idSecretaire == currentUser.idUtilisateur */
      )
);

// export const selectConsultationByPatient = createSelector(
//    [(state) => state.consultation, (state, idPatient) => idPatient],
//    (consultation, idPatient) =>
//    consultation.filter(
//          (c) =>
//             c.audio /* && c.audio.idSecretaire == currentUser.idUtilisateur */
//       )
// );
