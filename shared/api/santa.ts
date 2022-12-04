import { ISanta } from "../models/santa";
import { instance } from "./axios";

const getAllSantas = (): Promise<ISanta[]> => {
	return instance.get('/santa')
		.then((res) => res.data);
};

const getSantaById = (id: string): Promise<ISanta> => {
	return instance.get(`/santa/${id}`)
		.then((res) => res.data);
};

const deleteSantaById = (id: string): Promise<null> => {
	return instance.delete(`/santa/${id}`)
		.then((res) => res.data);
};

export {
	getAllSantas,
	getSantaById,
	deleteSantaById,
};
