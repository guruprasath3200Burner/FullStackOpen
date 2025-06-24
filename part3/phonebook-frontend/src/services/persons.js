import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAll = () => {
  return axios.get(`${baseUrl}/api/persons`);
};

const create = (newObject) => {
  return axios.post(`${baseUrl}/api/persons`, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/api/persons/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/api/persons/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deletePerson,
};
