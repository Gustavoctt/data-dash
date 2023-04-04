import { IUsers } from "../../types/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAssets } from "../../types/assets";
import { Assets, Users } from "../../services";
import { normalizeDateToLocale } from "../../utils";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import * as S from "./styles";
import Box from "../../components/Box";
import { Status } from "../../components/Status";
import { Sidebar } from "../../components/Sidebar";
import { AssetInfo } from "../../components/AssetInfo";
import { Loading } from "../../hooks";
import { Skeleton } from "antd";

// TODO
// [ x ] - Pegar os dados da API, para um unico elemento
// [ x ] - Montar em tela os dados
// [ x ] - "Juntar" dados de User com Assigned Users
// [ x ] - Trazer o icone confome for o status do asset
// [] - Componentizar as linhas da tabela

export function Asset() {
  const [asset, setAsset] = useState<IAssets[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const { id } = useParams();

  const getAppItems = async (id: string | number) => {
    try {
      showLoading();
      const asset = await Assets.getUniqueAsset(id);

      const users = await Users.getAllUsers();

      const tranformedUsers = users.filter(
        (item) => !!asset.assignedUserIds.find((id) => item.id === id)
      );

      setUsers(tranformedUsers);

      setAsset([asset]);
    } catch (error) {
      throw new Error("Houve um erro ao obter os itens");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (id) {
      getAppItems(id);
    }
  }, [id]);

  function getFirstLetter(name: string) {
    return name.split(" ").map((item) => item.charAt(0));
  }

  const options: Highcharts.Options = {
    chart: {
      width: 500,
      height: 300,
      backgroundColor: "",
    },
    title: {
      text: "",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            name: "health life",
            y: asset[0]?.healthscore,
          },
          {
            name: "desgaste",
            y: 100 - asset[0]?.healthscore,
          },
        ],
      },
    ],
  };
  return (
    <S.Container>
      <Sidebar />
      <S.ContainerRigth>
        <S.Header>
          <S.Specifications>
            <AssetInfo
              name={asset[0]?.name}
              model={asset[0]?.model}
              status={asset[0]?.status}
            />
          </S.Specifications>
          <p>Company Name - ID</p>
        </S.Header>

        <S.Content>
          <Box>
            <h1>Health Score</h1>
            <Skeleton loading={isLoading}>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </Skeleton>
          </Box>
          <Box>
            <h1>Health History</h1>
            <S.Table>
              <Skeleton loading={isLoading}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {asset.map((item) =>
                    item.healthHistory.map((health) => (
                      <tr key={item.id}>
                        <td>{normalizeDateToLocale(health.timestamp)}</td>
                        <td>
                          <Status status={health.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Skeleton>
            </S.Table>
          </Box>
          <Box>
            <h1>Assigned Users ID</h1>
            <S.Table>
              <Skeleton loading={isLoading}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <S.AvatarComponent style={{ backgroundColor: "#87d068" }}>
                        {getFirstLetter(user.name)}
                      </S.AvatarComponent>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Skeleton>
            </S.Table>
          </Box>
          <Box>
            <h1>Sensors</h1>
            <S.Table>
              <thead>
                <tr>
                  <th>Especificação</th>
                  <th>Imagem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
              </tbody>
            </S.Table>
          </Box>
        </S.Content>
      </S.ContainerRigth>
    </S.Container>
  );
}
