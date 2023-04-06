import axios from "axios";
import { ICompany } from "../../types/companies";

const getAllCompanies = async (): Promise<ICompany[]> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/companies`
    );

    return data;
  } catch (error) {
    throw new Error("An errror ocurred while getting companies");
  }
};

const createCompany = async (companyData: Pick<ICompany, "name">) => {
  try {
    const { data } = await axios.post(
      "https://my-json-server.typicode.com/tractian/fake-api/companies",
      companyData
    );

    return data;
  } catch (error) {
    throw new Error("An errror ocurred while creting companies");
  }
};

export default {
  getAllCompanies,
  createCompany,
};
