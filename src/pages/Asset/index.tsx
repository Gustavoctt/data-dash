import { IUsers } from "../../types/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAssets } from "../../types/assets";
import { Assets, Companies, Units, Users } from "../../services";
import { normalizeDateToLocale } from "../../utils";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import * as S from "./styles";
import Box from "../../components/Box";
import { Status } from "../../components/Status";
import { Sidebar } from "../../components/Sidebar";
import { AssetInfo } from "../../components/AssetInfo";
import { Loading } from "../../hooks";
import { Image, Skeleton } from "antd";
import { ICompany } from "../../types/companies";
import { IUnits } from "../../types/units";

// TODO
// [ x ] - Pegar os dados da API, para um unico elemento
// [ x ] - Montar em tela os dados
// [ x ] - "Juntar" dados de User com Assigned Users
// [ x ] - Trazer o icone confome for o status do asset
// [] - Trazer os "specifications"

export function Asset() {
  const [asset, setAsset] = useState<IAssets[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [company, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnits[]>([]);
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

      const company = await Companies.getAllCompanies();
      const unit = await Units.getAllUnits();

      const getAssetUnit = unit.filter(
        (item) => item.id == Number(asset.unitId)
      );

      setAsset([asset]);
      setUsers(tranformedUsers);
      setCompanies(company);
      setUnits(getAssetUnit);
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

  const specifications = asset.map((item) => item.specifications);

  const machineImage = asset.map((item) => item.image);

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
            name: "Vida Útil",
            y: asset[0]?.healthscore,
          },
          {
            name: "Desgaste",
            y: 100 - asset[0]?.healthscore,
          },
        ],
      },
    ],
  };
  return (
    <S.Container>
      <S.ContainerRigth>
        <S.Header>
          <S.AssetData>
            <AssetInfo
              name={asset[0]?.name}
              model={asset[0]?.model}
              status={asset[0]?.status}
            />
          </S.AssetData>
          <S.CompanyInfo>
            <Skeleton
              style={{ width: "140px" }}
              paragraph={{ rows: 2 }}
              title={false}
              loading={isLoading}
            >
              <p>{company.map((item) => item.name)}</p>
              <p>{units.map((item) => item.name)}</p>
            </Skeleton>
          </S.CompanyInfo>
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
                      <tr key={health.timestamp}>
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
            <Skeleton loading={isLoading} paragraph={{ rows: 1 }} title={false}>
              <Image src={machineImage[0]} />
            </Skeleton>
          </Box>
        </S.Content>
      </S.ContainerRigth>
    </S.Container>
  );
}
