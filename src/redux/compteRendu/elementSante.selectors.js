import { createSelector } from "reselect";

export const selectCompteRenduBySecretaire = createSelector(
   [(state) => state.compteRendu, (state, idSecretaire) => idSecretaire],
   (compteRendu, idSecretaire) =>
      compteRendu.filter(
         (c) =>
            c.audio /* && c.audio.idSecretaire == currentUser.idUtilisateur */
      )
);
