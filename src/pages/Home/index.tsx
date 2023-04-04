import Box from "../../components/Box";
import { Sidebar } from "../../components/Sidebar";
import { Eye } from "@phosphor-icons/react";
import * as S from "./styles";
import { Assets } from "../../services";
import { useEffect, useState } from "react";
import { IAssets } from "../../types/assets";
import { Status } from "../../components/Status";

// TODO
// [ x ] - Criar o layout ta tela de items
// [ x ] - Fazer a conexão com a API e retornar para a HOME
// [ x ] - Tipar os dados
// [] - Criar um Loagind enquanto traz os dados

export function Home() {
  const [assets, setAssets] = useState<IAssets[]>([]);

  const getAppItems = async () => {
    try {
      const asset = await Assets.getAllAssets();

      setAssets(asset);
    } catch (error) {
      throw new Error("Houve um erro ao obter os itens");
    }
  };

  useEffect(() => {
    getAppItems();
  }, []);

  function translateStatus(status: string) {
    switch (status) {
      case "inAlert":
        return "Em alerta";
      case "inOperation":
        return "Em Operação";
      case "inDowntime":
        return "Em Parada";
    }
  }

  return (
    <S.HomeContainer>
      <Sidebar />
      <S.Content>
        <Box>
          <S.HistoryContainer>
            <h1>Todos os ativos</h1>

            <S.HistoryList>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Vida Util</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.id}</td>
                      <td>{asset.name}</td>
                      <td>{asset.healthscore}%</td>
                      <td>
                        {asset.status === "inOperation" && (
                          <Status statusColor="green">
                            {translateStatus(asset.status)}
                          </Status>
                        )}
                        {asset.status === "inDowntime" && (
                          <Status statusColor="red">
                            {translateStatus(asset.status)}
                          </Status>
                        )}
                        {asset.status !== "inDowntime" &&
                          asset.status !== "inOperation" && (
                            <Status statusColor="yellow">
                              {translateStatus(asset.status)}
                            </Status>
                          )}
                      </td>
                      <td>
                        <S.Button to={`/asset/${asset.id}`}>
                          <Eye size={24} />
                          Visualizar
                        </S.Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.HistoryList>
          </S.HistoryContainer>
        </Box>
      </S.Content>
    </S.HomeContainer>
  );
}
