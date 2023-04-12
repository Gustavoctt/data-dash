import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { IUnits } from "../../types/units";
import { IUsers } from "../../types/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAssets } from "../../types/assets";
import { ICompany } from "../../types/companies";
import { Status } from "../../components/Status";
import {
  Avatar,
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
import { FireSimple, Gear, Lightning, Plus } from "@phosphor-icons/react";

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

  return (
    <S.Container>
      {contextHolder}
      <Box>
        <S.ContentBox>
          <Skeleton loading={isLoading} paragraph={{ rows: 1 }} title={false}>
            <Image
              src={asset?.uniqueAsset?.image}
              style={{ borderRadius: "8px" }}
            />
          </Skeleton>
          <S.ContentAsset>
            <S.MachineData>
              <S.ContentData>
                <Skeleton
                  loading={isLoading}
                  paragraph={{ rows: 5 }}
                  title={false}
                >
                  <Status status={asset?.uniqueAsset.status || "inAlert"} />
                  <S.TitleMachine>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {asset?.uniqueAsset.name}
                    </Typography.Title>
                    <Typography.Text>{`${asset?.uniqueAsset.model} - sensor (${asset?.uniqueAsset.sensors})`}</Typography.Text>
                  </S.TitleMachine>
                  <S.Specifications>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      Specifications
                    </Typography.Title>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FireSimple /> Temp. Máx
                      </Typography.Text>
                      <Typography.Text>
                        {asset?.uniqueAsset.specifications.maxTemp || 0}°C
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Lightning /> Power
                      </Typography.Text>
                      <Typography.Text>
                        {asset?.uniqueAsset.specifications.power || 0}kwh
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Gear /> RPM
                      </Typography.Text>
                      <Typography.Text>
                        {asset?.uniqueAsset.specifications.rpm || 0}
                      </Typography.Text>
                    </div>
                  </S.Specifications>
                </Skeleton>
              </S.ContentData>
              <S.ContentData>
                <Skeleton
                  loading={isLoading}
                  paragraph={{ rows: 5 }}
                  title={false}
                >
                  <Typography.Text style={{ marginTop: "24px" }}>
                    Assigned Users
                  </Typography.Text>
                  <S.UsersAssigned>
                    {asset?.usersAssignedWithAsset.map((user) => (
                      <Avatar
                        style={{
                          backgroundColor: "var(--gray-400)",
                          color: "var(--gray-800)",
                        }}
                      >
                        {getFirstLetter(user.name)}
                      </Avatar>
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
                  </S.UsersAssigned>
                  <S.Specifications>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      Uptimes
                    </Typography.Title>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        All
                      </Typography.Text>
                      <Typography.Text>
                        {asset?.uniqueAsset.metrics.totalUptime.toFixed(2)}
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Collection
                      </Typography.Text>
                      <Typography.Text>
                        {asset?.uniqueAsset.metrics.totalCollectsUptime}
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Last
                      </Typography.Text>
                      <Typography.Text>
                        {normalizeDateToLocale(
                          asset?.uniqueAsset.metrics.lastUptimeAt || ""
                        )}
                      </Typography.Text>
                    </div>
                  </S.Specifications>
                </Skeleton>
              </S.ContentData>
              <S.ContentData>
                <S.Buttons>
                  <Button
                    type="primary"
                    ghost
                    style={{
                      color: "var(--green)",
                      borderColor: "var(--green)",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    style={{ color: "var(--red)", borderColor: "var(--red)" }}
                  >
                    Delete
                  </Button>
                </S.Buttons>
              </S.ContentData>
            </S.MachineData>
            <Divider />
            <S.OrderData>
              <Skeleton
                loading={isLoading}
                paragraph={{ rows: 3 }}
                title={false}
              >
                <S.FooterData>
                  <Typography.Text>Health</Typography.Text>
                  <Progress
                    steps={10}
                    strokeColor={"var(--green)"}
                    percent={asset?.uniqueAsset.healthscore}
                  />
                </S.FooterData>
              </Skeleton>
              <Skeleton
                loading={isLoading}
                paragraph={{ rows: 5 }}
                title={false}
              >
                <S.FooterData>
                  <Typography.Text>Opened work orders</Typography.Text>
                  <S.WorkOrder>
                    <Typography.Text>Repair Motor H13D-1</Typography.Text>
                    <Typography.Text
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        color: "var(--gray-700)",
                      }}
                    >
                      The Fan is not working properly and needs to be repaired
                    </Typography.Text>
                    <Button type="link" style={{ color: "var(--blue)" }}>
                      View
                    </Button>
                  </S.WorkOrder>
                  <S.WorkOrder>
                    <Typography.Text>Repair Motor H13D-1</Typography.Text>
                    <Typography.Text
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        color: "var(--gray-700)",
                      }}
                    >
                      The Fan is not working properly and needs to be repaired
                    </Typography.Text>
                    <Button type="link" style={{ color: "var(--blue)" }}>
                      View
                    </Button>
                  </S.WorkOrder>
                </S.FooterData>
              </Skeleton>
            </S.OrderData>
          </S.ContentAsset>
        </S.ContentBox>
      </Box>
    </S.Container>
  );
}
