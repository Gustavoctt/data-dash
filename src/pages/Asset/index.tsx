import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Alert, Image, Skeleton, Typography } from "antd";
import * as Highcharts from "highcharts";
import { IUnits } from "../../types/units";
import { IUsers } from "../../types/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAssets } from "../../types/assets";
import { ICompany } from "../../types/companies";
import { Status } from "../../components/Status";
import { AssetInfo } from "../../components/AssetInfo";
import HighchartsReact from "highcharts-react-official";
import { Assets, Companies, Units, Users } from "../../services";
import { getFirstLetter, normalizeDateToLocale } from "../../utils";

interface IAssetWithUsers {
  uniqueAsset: IAssets | undefined;
  usersAssignedWithAsset: IUsers[] | undefined;
  usersWithCompany: ICompany[];
  usersWithUnits: IUnits[];
}

export function Asset() {
  const [asset, setAsset] = useState<IAssetWithUsers>();

  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const { id } = useParams();

  const getAsset = async (id: string | number) => {
    try {
      showLoading();
      const uniqueAsset = await Assets.getUniqueAsset(id);
      const allUsers = await Users.getAllUsers();
      const allCompanies = await Companies.getAllCompanies();
      const allUnits = await Units.getAllUnits();

      const usersAssignedWithAsset = allUsers.filter(
        (user) => !!uniqueAsset.assignedUserIds.find((id) => user.id === id)
      );

      const usersWithCompany = allCompanies.filter((company) => {
        return company.id === uniqueAsset.companyId;
      });

      const usersWithUnits = allUnits.filter((unit) => {
        return unit.id === Number(uniqueAsset.unitId);
      });

      setAsset({
        uniqueAsset,
        usersAssignedWithAsset,
        usersWithCompany,
        usersWithUnits,
      });
    } catch (error) {
      return (
        <Alert
          message="Error"
          description="There was an error get asset, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (id) {
      getAsset(id);
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
        data: [
          {
            name: "Vida Útil",
            y: asset?.uniqueAsset?.healthscore,
          },
          {
            name: "Desgaste",
            y:
              asset?.uniqueAsset?.healthscore &&
              100 - asset?.uniqueAsset?.healthscore,
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
              name={asset?.uniqueAsset?.name}
              model={asset?.uniqueAsset?.model}
              status={asset?.uniqueAsset?.status}
            />
          </S.AssetData>
          <S.CompanyInfo>
            <Skeleton
              style={{ width: "140px" }}
              paragraph={{ rows: 2 }}
              title={false}
              loading={isLoading}
            >
              <Typography.Text>
                {asset?.usersWithCompany.map((company) => company.name)}
              </Typography.Text>
              <Typography.Text>
                {asset?.usersWithUnits.map((unit) => unit.name)}
              </Typography.Text>
            </Skeleton>
          </S.CompanyInfo>
        </S.Header>

        <S.Content>
          <Box>
            <Typography.Title level={2}>Health Score</Typography.Title>
            <Skeleton loading={isLoading}>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </Skeleton>
          </Box>
          <Box>
            <Typography.Title level={2}>Health History</Typography.Title>
            <S.Table>
              <Skeleton loading={isLoading}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {asset?.uniqueAsset?.healthHistory.map((item) => (
                    <tr key={item.timestamp}>
                      <td>{normalizeDateToLocale(item.timestamp)}</td>
                      <td>
                        <Status status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Skeleton>
            </S.Table>
          </Box>
          {asset?.usersAssignedWithAsset && (
            <Box>
              <Typography.Title level={2}>Assigned Users ID</Typography.Title>
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
                    {asset?.usersAssignedWithAsset.map((user) => (
                      <tr key={user.id}>
                        <S.AvatarComponent
                          style={{ backgroundColor: "#87d068" }}
                        >
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
          )}
          <Box>
            <Skeleton loading={isLoading} paragraph={{ rows: 1 }} title={false}>
              <Image src={asset?.uniqueAsset?.image} />
            </Skeleton>
          </Box>
        </S.Content>
      </S.ContainerRigth>
    </S.Container>
  );
}
