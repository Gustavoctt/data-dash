import { Alert, Input, Skeleton, Typography } from "antd";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { IUsers } from "../../types/users";
import { IUnits } from "../../types/units";
import { useEffect, useState } from "react";
import { Units, Users } from "../../services";

import * as S from "./styles";
interface IUsersWhithUnit extends IUsers {
  unit: IUnits | undefined;
}

export function PageUsers() {
  const [users, setUsers] = useState<IUsersWhithUnit[]>([]);
  const [search, setSearch] = useState<string>("");
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
      return (
        <Alert
          message="Error"
          description="There was an error getting the users, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
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

  return (
    <S.HomeContainer>
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <S.HistoryContainer>
              <Typography.Title level={2}>Users</Typography.Title>

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
    </S.HomeContainer>
  );
}
