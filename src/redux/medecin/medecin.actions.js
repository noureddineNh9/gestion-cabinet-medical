export const setMedecinData = (data) => ({
   type: "SET_MEDECIN_DATA",
   payload: data,
});

export const ajouterMedecin = (data) => ({
   type: "AJOUTER_MEDECIN",
   payload: data,
});

export const updateMedecin = (data) => ({
   type: "UPDATE_MEDECIN",
   payload: data,
});

export const deleteMedecin = (data) => ({
   type: "DELETE_MEDECIN",
   payload: data,
});
