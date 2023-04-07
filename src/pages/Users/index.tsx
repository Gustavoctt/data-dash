import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { IUsers } from "../../types/users";
import { IUnits } from "../../types/units";
import { useEffect, useState } from "react";
import { Units, Users } from "../../services";

import * as S from "./styles";
import { PlusCircle } from "@phosphor-icons/react";
interface IUsersWhithUnit extends IUsers {
  unit: IUnits | undefined;
}

export function PageUsers() {
  const [users, setUsers] = useState<IUsersWhithUnit[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    showLoading();
    try {
      const allUsers = await Users.getAllUsers();

      const allUnits = await Units.getAllUnits();

      const usersWithUnits = allUsers.map((user) => {
        const unit = allUnits.find((unit) => unit.id === user.unitId);

        return {
          ...user,
          unit,
        };
      });

      setUsers(usersWithUnits);
    } catch (error) {
      openErrorNotification();
    } finally {
      hideLoading();
    }
  };

  const openErrorNotification = () => {
    api.error({
      message: "There was an error getting the users, please try again!",
    });
  };

  const filteredUsers = users.filter((user) => {
    if (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.unit?.name.toLowerCase().includes(search.toLowerCase())
    )
      return true;

    return false;
  });

  const handleSubmitUser = async (values: any) => {
    showLoading();
    try {
      const userCreated = await Users.createUser(values, users.length);

      setUsers([...users, userCreated]);
    } catch (error) {
      openErrorNotification();
    } finally {
      hideLoading();
      setIsModalOpen(!isModalOpen);
    }
  };

  const convertUnitsToArrayofObjects = () => {
    const uniqueUnits = [...new Set(users.map((user) => user.unit))];

    const output = uniqueUnits.map((unit, index) => ({
      value: unit?.id,
      label: unit?.name,
    }));

    return output;
  };

  return (
    <S.HomeContainer>
      {contextHolder}
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <S.HistoryContainer>
              <S.Header>
                <Typography.Title level={2}>Users</Typography.Title>

                <Button
                  type="primary"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  icon={<PlusCircle size={24} />}
                  style={{
                    display: "flex",
                    backgroundColor: "var(--blue)",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  New User
                </Button>
              </S.Header>

              <S.HistoryList>
                <Input
                  placeholder="Search by name, email or unit"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Unit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.unit?.name || "Unit not found"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </S.HistoryList>
            </S.HistoryContainer>
          </Skeleton>
        </Box>
      </S.Content>

      <Modal
        title="Add new user"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form
          onFinish={handleSubmitUser}
          layout="vertical"
          style={{ marginTop: "2rem" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            label="Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="unitId"
            rules={[{ required: true, message: "Please select unit!" }]}
            label="Unit"
          >
            <Select
              options={convertUnitsToArrayofObjects()}
              placeholder="Please select an unit"
            ></Select>
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
    </S.HomeContainer>
  );
}
