import axios from "axios";
import { IAssets } from "../../types/assets";

const getAllAssets = async (): Promise<IAssets[]> => {
  try {
    const { data } = await axios.get<IAssets[]>(
      `https://my-json-server.typicode.com/tractian/fake-api/assets`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter os itens");
  }
};

const getUniqueAsset = async (id: number | string): Promise<IAssets> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/assets/${id}`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter os itens");
  }
};

export default {
  getAllAssets,
  getUniqueAsset,
};
