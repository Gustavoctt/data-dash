import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Assets } from "../../services";
import { Eye } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { IAssets } from "../../types/assets";
import { Alert, Input, Skeleton, Typography } from "antd";
import { Status } from "../../components/Status";

export function Home() {
  const [assets, setAssets] = useState<IAssets[]>([]);
  const [search, setSearch] = useState<string>("");
  const { hideLoading, showLoading, isLoading } = Loading.useLoading();

  useEffect(() => {
    getAllAssets();
  }, []);

  const getAllAssets = async () => {
    showLoading();
    try {
      const allAssets = await Assets.getAllAssets();

      setAssets(allAssets);
    } catch (error) {
      return (
        <Alert
          message="Error"
          description="There was an error getting the assets, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
  };

  const filteredAssets = assets.filter((asset) => {
    if (
      asset.status.toLowerCase().includes(search.toLowerCase()) ||
      asset.name.toLowerCase().includes(search.toLowerCase())
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
              <Typography.Title level={2}>All assets</Typography.Title>

              <S.HistoryList>
                <Input
                  placeholder="Search by name or status"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Life cycle</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id}>
                        <td>{asset.id}</td>
                        <td>{asset.name}</td>
                        <td>{asset.healthscore}%</td>
                        <td>
                          <Status status={asset.status} />
                        </td>
                        <td>
                          <S.Button to={`/asset/${asset.id}`}>
                            <Eye size={24} />
                            View
                          </S.Button>
                        </td>
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
