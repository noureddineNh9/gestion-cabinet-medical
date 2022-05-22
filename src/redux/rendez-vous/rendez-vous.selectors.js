import { createSelector } from "reselect";

export const selectRdvByPatient = createSelector(
   [(state) => state.rendezVous, (state, idPatient) => idPatient],
   (rdv, idPatient) =>
      rdv.filter((r) => r.idPatient === idPatient && r.status !== "termine")
);

export const selectRdvByMedecin = createSelector(
   [(state) => state.rendezVous, (state, idMedecin) => idMedecin],
   (rdv, idMedecin) =>
      rdv.filter((r) => r.idMedecin === idMedecin && r.status === "confirme")
);
