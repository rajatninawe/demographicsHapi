import axiosInstance from ".";
import { resolve } from "./resolve";

export const getPatientData = async (id) => {
  return await resolve(
    axiosInstance.get(`/Patient?_id=${id}`).then((res) => res.data)
  );
};

export const getSinglePatientDetails = async (id) => {
  return await resolve(
    axiosInstance.get(`/Patient/${id}`).then((res) => res.data)
  );
};

export const getPatientClaimDetails = async (id) => {
  return await resolve(
    axiosInstance.get(`/Claim?patient=${id}`).then((res) => res.data)
  );
};

export const getPatientEncDetails = async (id) => {
  return await resolve(
    axiosInstance.get(`/Encounter?patient=${id}`).then((res) => res.data)
  );
};
