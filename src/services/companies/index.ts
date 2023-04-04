import axios from "axios";
import { ICompany } from "../../types/companies";

const getAllCompanies = async (): Promise<ICompany[]> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/companies`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter os itens");
  }
};

export default {
  getAllCompanies,
};
