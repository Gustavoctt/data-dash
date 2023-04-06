import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Companies } from "../../services";
import { useEffect, useState } from "react";
import { Alert, Input, Skeleton } from "antd";
import { ICompany } from "../../types/companies";

export function PageCompanies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [search, setSearch] = useState<string>("");
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = async () => {
    showLoading();
    try {
      const allCompanies = await Companies.getAllCompanies();

      setCompanies(allCompanies);
    } catch (error) {
      return (
        <Alert
          message="Error"
          description="There was an error getting the companies, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
  };

  const filteredCompanies = companies.filter((company) => {
    if (company.name.toLowerCase().includes(search.toLowerCase())) return true;

    return false;
  });

  return (
    <S.HomeContainer>
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <S.HistoryContainer>
              <S.Header>
                <h1>Companies</h1>
              </S.Header>

              <S.HistoryList>
                <Input
                  placeholder="Search by company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
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
