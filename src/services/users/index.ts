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

export default {
  getAllUsers,
};
