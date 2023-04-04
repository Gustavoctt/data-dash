import { IUsers } from "../../types/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAssets } from "../../types/assets";
import { Assets, Users } from "../../services";
import { normalizeDateToLocale } from "../../utils";
import { WarningCircle, CheckCircle, StopCircle } from "@phosphor-icons/react";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import * as S from "./styles";
import Box from "../../components/Box";
import { Status } from "../../components/Status";
import { Sidebar } from "../../components/Sidebar";

// TODO
// [ x ] - Pegar os dados da API, para um unico elemento
// [] - Montar em tela os dados
// [] - "Juntar" dados de User com Assigned Users
// [] - Trazer o icone confome for o status do asset
// [] - Componentizar as linhas da tabela

export function Asset() {
  const [asset, setAsset] = useState<IAssets>();
  const [users, setUsers] = useState<IUsers[]>();

  const { id } = useParams();

  const getAppItems = async (id: string | number) => {
    try {
      const asset = await Assets.getUniqueAsset(id);

      const users = await Users.getAllUsers();

      const tranformedUsers = users.filter(
        (item) => !!asset.assignedUserIds.find((id) => item.id === id)
      );

      setAsset(asset);
      setUsers(tranformedUsers);
    } catch (error) {
      throw new Error("Houve um erro ao obter os itens");
    }
  };

  useEffect(() => {
    if (id) {
      getAppItems(id);
    }
  }, [id]);

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
        data: [87, 13],
      },
    ],
  };
  return (
    <S.Container>
      <Sidebar />
      <S.ContainerRigth>
        <S.Header>
          <S.Info>
            <div>
              <p>Name : {asset?.name}</p>
              <p>Model : {asset?.model}</p>
            </div>
            <CheckCircle size={32} color="green" />
          </S.Info>
          <p>Company Name - ID</p>
        </S.Header>

        <S.Specifications>
          <Box>
            <h2>Titulo</h2>
            <p>Specipfication name</p>
          </Box>
          <Box>
            <h2>Titulo</h2>
            <p>Specipfication name</p>
          </Box>
        </S.Specifications>

        <S.Content>
          <Box>
            <h1>Health Score</h1>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Box>
          <Box>
            <h1>Health History</h1>
            <S.Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {asset?.healthHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{normalizeDateToLocale(item.timestamp)}</td>
                    <td>
                      {item.status === "inOperation" && (
                        <Status statusColor="green">{item.status}</Status>
                      )}
                      {item.status === "inDowntime" && (
                        <Status statusColor="red">{item.status}</Status>
                      )}
                      {item.status !== "inDowntime" &&
                        item.status !== "inOperation" && (
                          <Status statusColor="yellow">{item.status}</Status>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </Box>
          <Box>
            <h1>Assigned Users ID</h1>
            <S.Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr>
                    <S.Avatar>JD</S.Avatar>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
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
