import { Alert, Input, Skeleton, Typography } from "antd";
import { Loading } from "../../hooks";
import { IUnits } from "../../types/units";
import { useEffect, useState } from "react";

import * as S from "./styles";

import Box from "../../components/Box";
import { Companies, Units } from "../../services";
import { ICompany } from "../../types/companies";

interface IUnitsWithCompanies extends IUnits {
  company: ICompany | undefined;
}

export function PageUnits() {
  const [units, setUnits] = useState<IUnitsWithCompanies[]>([]);
  const [search, setSearch] = useState<string>("");

  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  useEffect(() => {
    getAllUnits();
  }, []);

  const getAllUnits = async () => {
    showLoading();
    try {
      const allUnits = await Units.getAllUnits();
      const allCompanies = await Companies.getAllCompanies();

      const unitsWithCompanies = allUnits.map((unit) => {
        const company = allCompanies.find(
          (company) => company.id === unit.companyId
        );

        return {
          ...unit,
          company,
        };
      });

      setUnits(unitsWithCompanies);
    } catch (error) {
      return (
        <Alert
          message="Error"
          description="There was an error getting the units, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
  };

  const filteredUnits = units.filter((unit) => {
    if (
      unit.name.toLowerCase().includes(search.toLowerCase()) ||
      unit.company?.name.toLowerCase().includes(search.toLowerCase())
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
              <Typography.Title level={2}>Units</Typography.Title>

              <S.HistoryList>
                <Input
                  placeholder="Search by name or company"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Company</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUnits.map((unit) => (
                      <tr key={unit.id}>
                        <td>{unit.id}</td>
                        <td>{unit.name}</td>
                        <td>{unit.company?.name || "Company not found"}</td>
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
