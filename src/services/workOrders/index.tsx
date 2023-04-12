import axios from "axios";
import { IWorkOrders } from "../../types/workOrders";

const getAllWorkOrders = async (): Promise<IWorkOrders[]> => {
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/tractian/fake-api/workorders`
    );

    return data;
  } catch (error) {
    throw new Error("Houve um erro ao obter as ordens de serviço");
  }
};

export default {
  getAllWorkOrders,
};
