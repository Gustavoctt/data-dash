import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
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
import {
  Button,
  Divider,
  Image,
  notification,
  Progress,
  Skeleton,
  Typography,
} from "antd";
import { Assets, Companies, Units, Users } from "../../services";
import { getFirstLetter, normalizeDateToLocale } from "../../utils";
import { PencilCircle, Plus, Trash } from "@phosphor-icons/react";

interface IAssetWithUsers {
  uniqueAsset: IAssets;
  usersAssignedWithAsset: IUsers[];
  usersWithCompany: ICompany[];
  usersWithUnits: IUnits[];
}

export function Asset() {
  const [asset, setAsset] = useState<IAssetWithUsers>();

  const [api, contextHolder] = notification.useNotification();
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAsset(id);
    }
  }, [id]);

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
      openErrorNotification();
    } finally {
      hideLoading();
    }
  };

  const openErrorNotification = () => {
    api.error({
      message: "There was an error get asset, please try again!",
    });
  };

  // console.log(asset);

  const formatedHelthHistory = () => {
    return asset?.uniqueAsset.healthHistory.map(({ status, timestamp }) => ({
      x: new Date(timestamp).getTime(),
      y: status,
    }));
  };

  const seriesFormatted = formatedHelthHistory();

  const options = {
    chart: {
      type: "spline",
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        overflow: "justify",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [
        {
          // Light air
          from: 0,
          to: 1,
          color: "rgba(175, 36, 75, 0.175)",
          label: {
            text: "In Alert",
            style: {
              color: "#121212",
            },
          },
        },
        {
          // Light breeze
          from: 1,
          to: 2,
          color: "rgba(0, 0, 0, 0)",
          label: {
            text: "In Downtime",
            style: {
              color: "#606060",
            },
          },
        },
        {
          // Gentle breeze
          from: 2,
          to: 3,
          color: "rgba(208, 213, 68, 0.1)",
          label: {
            text: "Unplanned Stop",
            style: {
              color: "#606060",
            },
          },
        },
        {
          // Moderate breeze
          from: 3,
          to: 4,
          color: "rgba(0, 0, 0, 0)",
          label: {
            text: "In Dontime",
            style: {
              color: "#606060",
            },
          },
        },
        {
          // Fresh breeze
          from: 4,
          to: 5,
          color: "rgba(68, 170, 213, 0.1)",
          label: {
            text: "Planned Stop",
            style: {
              color: "#606060",
            },
          },
        },
      ],
    },
    tooltip: {
      valueSuffix: " m/s",
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "",
        data: [
          4.5, 4.1, 4.4, 3.7, 4.2, 3.7, 4.3, 4, 5, 4.9, 4.8, 4.6, 3.9, 3.8, 2.7,
          3.1, 2.6, 3.3, 3.8, 4.1, 1, 1.9, 3.2, 3.8, 4.2,
        ],
      },
    ],
  };

  return (
    <S.Container>
      <S.AssetBox>
        <S.ContentLeft>
          <Image
            src={asset?.uniqueAsset?.image}
            style={{ borderRadius: "8px", maxHeight: "344px" }}
          />
        </S.ContentLeft>
        <S.ContentRight>
          <S.ContentMachineData>
            <S.AllData>
              <S.DataLeft>
                <Status status={asset?.uniqueAsset.status || "inAlert"} />
                <S.MachineData>
                  <p>{asset?.uniqueAsset.name}</p>
                  <p>{`${asset?.uniqueAsset.model} (sensor ${asset?.uniqueAsset.sensors})`}</p>
                </S.MachineData>
                <S.Specification>
                  <p>Specifications</p>
                  <S.SpecificationData>
                    <div>
                      <p>Temp máx</p>
                      <span>
                        {asset?.uniqueAsset.specifications.maxTemp || 0}°C
                      </span>
                    </div>
                    <div>
                      <p>Potência</p>
                      <span>
                        {asset?.uniqueAsset.specifications.power || 0}kwh
                      </span>
                    </div>
                    <div>
                      <p>RPM</p>
                      <span>{asset?.uniqueAsset.specifications.rpm || 0}</span>
                    </div>
                  </S.SpecificationData>

                  <S.HealthBox>
                    <p>Health</p>
                    <Progress
                      percent={asset?.uniqueAsset.healthscore}
                      size="default"
                      status="active"
                    />
                  </S.HealthBox>
                </S.Specification>
              </S.DataLeft>
              <S.DataRight>
                <S.AssignedUsers>
                  <p>Assigned users</p>
                  <div>
                    {asset?.usersAssignedWithAsset.map((user) => (
                      <S.AvatarComponent
                        style={{ backgroundColor: "var(--gray-400)" }}
                      >
                        {getFirstLetter(user.name)}
                      </S.AvatarComponent>
                    ))}
                    <Button
                      shape="circle"
                      icon={<Plus size={16} />}
                      style={{
                        display: "flex",
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                </S.AssignedUsers>
                <S.Specification>
                  <p>Uptime</p>
                  <S.SpecificationData>
                    <div>
                      <p>All uptime</p>
                      <span>
                        {asset?.uniqueAsset.metrics.totalUptime.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <p>Uptime count</p>
                      <span>
                        {asset?.uniqueAsset.metrics.totalCollectsUptime}
                      </span>
                    </div>
                    <div>
                      <p>Last uptime</p>
                      <span>
                        {normalizeDateToLocale(
                          asset?.uniqueAsset.metrics.lastUptimeAt || "0"
                        )}
                      </span>
                    </div>
                  </S.SpecificationData>
                </S.Specification>
              </S.DataRight>
            </S.AllData>
            <S.Buttons>
              <Button
                type="primary"
                // onClick={() => setIsModalOpen(!isModalOpen)}
                icon={<PencilCircle size={24} />}
                style={{
                  display: "flex",
                  backgroundColor: "var(--blue)",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                // onClick={() => setIsModalOpen(!isModalOpen)}
                icon={<Trash size={24} />}
                style={{
                  display: "flex",
                  backgroundColor: "var(--red)",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                Delete
              </Button>
            </S.Buttons>
          </S.ContentMachineData>
        </S.ContentRight>
      </S.AssetBox>

      <S.Graphics>
        <Box>
          <S.Table>
            <Skeleton loading={isLoading}>
              <thead>
                <tr>
                  <th>Date</th>
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
        <Box>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </S.Graphics>
    </S.Container>
  );
}
