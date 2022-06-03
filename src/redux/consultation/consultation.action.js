export const setConsultationData = (data) => ({
   type: "SET_CONSULTATION_DATA",
   payload: data,
});

export const ajouterConsultation = (data) => ({
   type: "AJOUTER_CONSULTATION",
   payload: data,
});

export const deleteConsultation = (data) => ({
   type: "DELETE_CONSULTATION",
   payload: data,
});
export const modifierConsultation = (data) => ({
   type: "UPDATE_CONSULTATION",
   payload: data,
});
