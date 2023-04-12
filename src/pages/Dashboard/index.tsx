import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Assets } from "../../services";
import { useEffect, useState } from "react";
import { IAssets } from "../../types/assets";
import { notification, Skeleton } from "antd";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";

export function Dashboard() {
  const [assets, setAssets] = useState<IAssets[]>([]);

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

  const allHealthScore = assets.map((asset) => ({
    data: asset.healthscore,
    name: asset.name,
  }));

  const allRmpAssets = assets.map((asset) => ({
    name: asset.name,
    value: asset.specifications.rpm || 0,
  }));

  const allTempAssets = assets.map((asset) => ({
    name: asset.name,
    value: asset.specifications.maxTemp || 0,
  }));

  const allStatusAssets = assets.reduce(
    (acc: Record<string, number>, asset) => {
      const status = asset.status;

      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;

      return acc;
    },
    {
      inAlert: 0,
      inOperation: 0,
      inDowntime: 0,
    }
  );

  const statusFormattedToObject = Object.entries(allStatusAssets).map(
    (status) => ({
      name: status[0],
      y: status[1],
    })
  );

  const openErrorNotification = () => {
    api.error({
      message: "Error when creating a new assets, please try again!",
    });
  };

  const optionsHealthScore = () => ({
    chart: {
      type: "bar",
    },
    colors: ["var(--blue)"],
    title: {
      text: "Health of each asset (%)",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      categories: allHealthScore.map((item) => item.name),
    },
    series: [
      {
        name: "Health (%)",
        data: allHealthScore.map((item) => item.data),
      },
    ],
  });

  const optionsRPM = () => ({
    chart: {
      type: "column",
    },
    colors: ["var(--orange)"],
    title: {
      text: "Rotations per minute/asset",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      categories: allRmpAssets.map((item) => item.name),
    },
    series: [
      {
        name: "RPM",
        data: allRmpAssets.map((item) => item.value),
      },
    ],
  });

  const optionsMaxTempInAsset = () => ({
    chart: {
      type: "spline",
    },
    colors: ["var(--red)"],
    title: {
      text: "Asset temperature",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      categories: allTempAssets.map((item) => item.name),
    },
    series: [
      {
        name: "Maximum temperature (°C)",
        data: allTempAssets.map((item) => item.value),
      },
    ],
  });

  const optionStatusAsset = () => ({
    chart: {
      type: "pie",
    },
    colors: ["var(--red)", "var(--green)", "var(--blue)"],
    title: {
      text: "Status fot asset",
    },
    yAxis: {
      title: {
        text: "",
      },
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Status",
        data: statusFormattedToObject,
      },
    ],
  });

  return (
    <S.HomeContainer>
      {contextHolder}
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsHealthScore()}
            />
          </Skeleton>
        </Box>
        <Box>
          <Skeleton loading={isLoading}>
            <HighchartsReact highcharts={Highcharts} options={optionsRPM()} />
          </Skeleton>
        </Box>
        <Box>
          <Skeleton loading={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsMaxTempInAsset()}
            />
          </Skeleton>
        </Box>
        <Box>
          <Skeleton loading={isLoading}>
            <HighchartsReact
              highcharts={Highcharts}
              options={optionStatusAsset()}
            />
          </Skeleton>
        </Box>
      </S.Content>
    </S.HomeContainer>
  );
}
