import Box from "../../components/Box";
import { Sidebar } from "../../components/Sidebar";
import { Eye } from "@phosphor-icons/react";
import * as S from "./styles";
import { Units, Users } from "../../services";
import { useEffect, useState } from "react";

import { Skeleton } from "antd";
import { Loading } from "../../hooks";
import { IUsers } from "../../types/users";
import { IUnits } from "../../types/units";

// TODO
// [ x ] - Criar o layout ta tela de items
// [ x ] - Fazer a conexão com a API e retornar para a HOME
// [ x ] - Tipar os dados
// [ x ] - Usar componentes do AntDesign
// [ x ] - Criar um Loagind enquanto traz os dados

export function PageUsers() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const getAppItems = async () => {
    showLoading();
    try {
      const getUsers = await Users.getAllUsers();

      setUsers(getUsers);
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
              <h1>Usuários</h1>

              <S.HistoryList>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Unidade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((asset) => (
                      <tr key={asset.id}>
                        <td>{asset.id}</td>
                        <td>{asset.name}</td>
                        <td>{asset.email}</td>
                        <td>{asset.unitId}</td>
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
