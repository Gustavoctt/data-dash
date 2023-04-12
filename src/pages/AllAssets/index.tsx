import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Assets } from "../../services";
import { Eye } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { IAssets } from "../../types/assets";
import {
  Button,
  Input,
  notification,
  Progress,
  Skeleton,
  Typography,
} from "antd";
import { Status } from "../../components/Status";
import { Link } from "react-router-dom";

export function AllAssets() {
  const [assets, setAssets] = useState<IAssets[]>([]);
  const [search, setSearch] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();
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
      openErrorNotification();
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

  const openErrorNotification = () => {
    api.error({
      message: "Error when creating a new assets, please try again!",
    });
  };

  return (
    <S.HomeContainer>
      {contextHolder}
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
                        <td>
                          <Progress
                            percent={asset.healthscore}
                            size="small"
                            status="active"
                            strokeColor={{
                              "0%": "var(--yellow)",
                              "100%":
                                asset.healthscore < 70
                                  ? "var(--red)"
                                  : "var(--green)",
                            }}
                          />
                        </td>
                        <td>
                          <Status status={asset.status} />
                        </td>
                        <td>
                          <Link to={`/asset/${asset.id}`}>
                            <Button
                              type="link"
                              style={{ color: "var(--blue)" }}
                            >
                              View asset
                            </Button>
                          </Link>
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
