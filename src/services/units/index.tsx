import axios from "axios";
import { IUnits } from "../../types/units";

const getAllUnits = async (): Promise<IUnits[]> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/units`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter os itens");
  }
};

export default {
  getAllUnits,
};
