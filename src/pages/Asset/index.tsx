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
  Empty,
  Form,
  Image,
  message,
  Modal,
  Progress,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { Assets, Companies, Units, Users, WorkOrders } from "../../services";
import { getFirstLetter, normalizeDateToLocale } from "../../utils";
import { FireSimple, Gear, Lightning, Plus } from "@phosphor-icons/react";
import { IWorkOrders } from "../../types/workOrders";

interface IAssetWithUsers {
  uniqueAsset: IAssets;
  usersAssignedWithAsset: IUsers[];
  usersWithCompany: ICompany[];
  usersWithUnits: IUnits[];
  workOrdersWhithAsset: IWorkOrders[];
}

interface IUnassignedUsers {
  label: string;
  value: number;
}

export function Asset() {
  const [asset, setAsset] = useState<IAssetWithUsers>();
  const [unassignedUsers, setUnassignedUsers] = useState<IUnassignedUsers[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  const [messageApi, contextHolder] = message.useMessage();

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
      const allWorkOrders = await WorkOrders.getAllWorkOrders();

      const usersAssignedWithAsset = allUsers.filter(
        (user) => !!uniqueAsset.assignedUserIds.find((id) => user.id === id)
      );

      const usersWithCompany = allCompanies.filter((company) => {
        return company.id === uniqueAsset.companyId;
      });

      const usersWithUnits = allUnits.filter((unit) => {
        return unit.id === Number(uniqueAsset.unitId);
      });

      const workOrdersWhithAsset = allWorkOrders.filter((item) => {
        return item.assetId === uniqueAsset.id;
      });

      const usersUnassigned = allUsers.filter(
        (user) => !uniqueAsset.assignedUserIds.includes(user.id)
      );

      const convertUnassignedUsersToSelectInput = usersUnassigned.map(
        (item) => ({
          value: item.id,
          label: item.name,
        })
      );

      setAsset({
        uniqueAsset,
        usersAssignedWithAsset,
        usersWithCompany,
        usersWithUnits,
        workOrdersWhithAsset,
      });

      setUnassignedUsers(convertUnassignedUsersToSelectInput);
    } catch (error) {
      handlerMessageNotification(
        "There was an error get asset, please try again!",
        "error"
      );
    } finally {
      hideLoading();
    }
  };

  const handleSubmitAssignedUsers = async (values: any) => {
    showLoading();
    try {
      await Assets.addAssignedUsers(id as string, [
        ...(asset?.uniqueAsset.assignedUserIds as number[]),
        values.userId,
      ]);

      handlerMessageNotification("Success on add User!", "success");
    } catch (error) {
      handlerMessageNotification(
        "There was an error post asset, please try again!",
        "error"
      );
    } finally {
      hideLoading();
      setIsModalOpen(!isModalOpen);
    }
  };

  const handlerMessageNotification = (
    message: string,
    type: "error" | "success"
  ) => {
    messageApi.open({
      type,
      content: message,
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
                        key={user.id}
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
                      onClick={() => setIsModalOpen(true)}
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
                        Count
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
                        Last update
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
                <Skeleton
                  loading={isLoading}
                  paragraph={{ rows: 1 }}
                  title={false}
                >
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
                      style={{
                        color: "var(--red)",
                        borderColor: "var(--red)",
                      }}
                    >
                      Delete
                    </Button>
                  </S.Buttons>
                </Skeleton>
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
                  {asset?.workOrdersWhithAsset.length ? (
                    asset?.workOrdersWhithAsset.map((workOrder) => (
                      <S.WorkOrder key={workOrder.id}>
                        <Typography.Text>{workOrder.title}</Typography.Text>
                        <Typography.Text
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            color: "var(--gray-700)",
                          }}
                        >
                          {workOrder.description}
                        </Typography.Text>
                        <Button type="link" style={{ color: "var(--blue)" }}>
                          View
                        </Button>
                      </S.WorkOrder>
                    ))
                  ) : (
                    <Empty />
                  )}
                </S.FooterData>
              </Skeleton>
            </S.OrderData>
          </S.ContentAsset>
        </S.ContentBox>
      </Box>

      <Modal
        title="Add new user to asset"
        open={isModalOpen}
        onOk={() => {}}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form onFinish={handleSubmitAssignedUsers} layout="vertical">
          <Form.Item
            name="userId"
            rules={[{ required: true, message: "Please select user!" }]}
            label="User"
          >
            <Select
              options={unassignedUsers}
              placeholder="Please select an user"
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ backgroundColor: "var(--green)" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </S.Container>
  );
}
