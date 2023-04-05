import Box from "../../components/Box";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";

import * as S from "./styles";

import { Input, Skeleton } from "antd";
import { Loading } from "../../hooks";
import { Companies } from "../../services";
import { ICompany } from "../../types/companies";

export function PageCompanies() {
  const [company, setCompany] = useState<ICompany[]>([]);
  // const [addQuestion, setAddQuestion] = useState(false);
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const getAppItems = async () => {
    showLoading();
    try {
      const getCompany = await Companies.getAllCompanies();

      setCompany(getCompany);
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
              <S.Header>
                <h1>Empresas</h1>
              </S.Header>

              <S.HistoryList>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                    </tr>
                  </thead>

                  <tbody>
                    {company.map((asset) => (
                      <tr key={asset.id}>
                        <td>{asset.id}</td>
                        <td>{asset.name}</td>
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
