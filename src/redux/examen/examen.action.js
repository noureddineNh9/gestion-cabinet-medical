export const setExamenData = (data) => ({
   type: "SET_EXAMEN_DATA",
   payload: data,
});

export const addExamen = (data) => ({
   type: "ADD_EXAMEN",
   payload: data,
});

export const updateExamen = (data) => ({
   type: "UPDATE_EXAMEN",
   payload: data,
});

export const deleteExamen = (data) => ({
   type: "DELETE_EXAMEN",
   payload: data,
});

export const deleteDocument = (data) => ({
   type: "DELETE_DOCUMENT",
   payload: data,
});
