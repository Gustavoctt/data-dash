import axios from "axios";
import { IUsers } from "../../types/users";

const getAllUsers = async (): Promise<IUsers[]> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/users`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter os itens");
  }
};

const createUser = async (userData: Omit<IUsers, "id">, id: number) => {
  try {
    const { data } = await axios.post(
      "https://my-json-server.typicode.com/tractian/fake-api/companies",
      {
        companyId: 1,
        name: userData.name,
        email: userData.email,
        unitId: userData.unitId,
        id: id + 1,
      }
    );

    return data;
  } catch (error) {
    throw new Error("An errror ocurred while creting companies");
  }
};

export default {
  getAllUsers,
  createUser,
};
