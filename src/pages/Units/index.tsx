import { Skeleton } from "antd";
import { Loading } from "../../hooks";
import { IUnits } from "../../types/units";
import { useEffect, useState } from "react";

import * as S from "./styles";

import Box from "../../components/Box";
import { Units } from "../../services";
import { Sidebar } from "../../components/Sidebar";

export function PageUnits() {
  const [units, setUnits] = useState<IUnits[]>([]);
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const getAppItems = async () => {
    showLoading();
    try {
      const getUnits = await Units.getAllUnits();

      setUnits(getUnits);
    } catch (error) {
      throw new Error("Houve um erro ao obter os itens");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getAppItems();
  }, []);

  return (
    <S.HomeContainer>
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <S.HistoryContainer>
              <h1>Unidades</h1>

              <S.HistoryList>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Empresa</th>
                      <th>Nome</th>
                    </tr>
                  </thead>

                  <tbody>
                    {units.map((unit) => (
                      <tr key={unit.id}>
                        <td>{unit.id}</td>
                        <td>{unit.companyId}</td>
                        <td>{unit.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </S.HistoryList>
            </S.HistoryContainer>
          </Skeleton>
        </Box>
      </S.Content>
    </S.HomeContainer>
  );
}
