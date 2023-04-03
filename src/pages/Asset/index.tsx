import * as S from "./styles";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Sidebar } from "../../components/Sidebar";
import Box from "../../components/Box";

export function Asset() {
  const options: Highcharts.Options = {
    chart: {
      // width: 500,
      // height: 300,
      backgroundColor: "",
    },
    title: {
      text: "",
    },
    series: [
      {
        type: "pie",
        data: [87, 13],
      },
    ],
  };
  return (
    <S.Container>
      <Sidebar />
      <S.ContainerRigth>
        <S.Header>
          <p>Name/Model and Status</p>
          <p>Company Name - ID</p>
        </S.Header>

        <S.Specifications>
          <Box>
            <h2>Titulo</h2>
            <p>Specipfication name</p>
          </Box>
          <Box>
            <h2>Titulo</h2>
            <p>Specipfication name</p>
          </Box>
        </S.Specifications>

        <S.Content>
          <Box>
            <h1>Health Score</h1>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Box>
          <Box>
            <h1>Health History</h1>
            <S.Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/04/2023 00:00</td>
                  <td>
                    <S.Span color="#027a48">Em funcionamento</S.Span>
                  </td>
                </tr>
                <tr>
                  <td>02/04/2023 00:00</td>
                  <td>
                    <S.Span color="#C11574">Em funcionamento</S.Span>
                  </td>
                </tr>
                <tr>
                  <td>02/04/2023 00:00</td>
                  <td>
                    <span>Em funcionamento</span>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </Box>
          <Box>
            <h1>Assigned Users ID</h1>
            <S.Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <S.Avatar>JD</S.Avatar>
                  <td>Jhon Doe</td>
                  <td>jhondow@teste.com</td>
                </tr>
                <tr>
                  <S.Avatar>JD</S.Avatar>
                  <td>Jhon Doe</td>
                  <td>jhondow@teste.com</td>
                </tr>
                <tr>
                  <S.Avatar>JD</S.Avatar>
                  <td>Jhon Doe</td>
                  <td>jhondow@teste.com</td>
                </tr>
              </tbody>
            </S.Table>
          </Box>
          <Box>
            <h1>Sensors</h1>
            <S.Table>
              <thead>
                <tr>
                  <th>Especificação</th>
                  <th>Imagem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
                <tr>
                  <td>HUIDHUID</td>
                  <td>Visualizar</td>
                </tr>
              </tbody>
            </S.Table>
          </Box>
        </S.Content>
      </S.ContainerRigth>
    </S.Container>
  );
}
