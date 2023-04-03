import Box from "../../components/Box";
import { Sidebar } from "../../components/Sidebar";
import { Eye } from "@phosphor-icons/react";
import * as S from "./styles";

export function Home() {
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
                  <tr>
                    <td>1</td>
                    <td>Motor HYOS-78</td>
                    <td>47%</td>
                    <td>
                      <S.Status>Em operação</S.Status>
                    </td>
                    <td>
                      <S.Button to={"/asset/1"}>
                        <Eye size={24} />
                        Visualizar
                      </S.Button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Motor HYOS-78</td>
                    <td>47%</td>
                    <td>
                      <S.Status>Em operação</S.Status>
                    </td>
                    <td>
                      <S.Button to={"/asset/1"}>
                        <Eye size={24} />
                        Visualizar
                      </S.Button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Motor HYOS-78</td>
                    <td>47%</td>
                    <td>
                      <S.Status>Em operação</S.Status>
                    </td>
                    <td>
                      <S.Button to={"/asset/1"}>
                        <Eye size={24} />
                        Visualizar
                      </S.Button>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Motor HYOS-78</td>
                    <td>47%</td>
                    <td>
                      <S.Status>Em operação</S.Status>
                    </td>
                    <td>
                      <S.Button to={"/asset/1"}>
                        <Eye size={24} />
                        Visualizar
                      </S.Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </S.HistoryList>
          </S.HistoryContainer>
        </Box>
      </S.Content>
    </S.HomeContainer>
  );
}
