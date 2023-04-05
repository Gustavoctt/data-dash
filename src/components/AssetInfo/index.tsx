import { WarningCircle, CheckCircle, StopCircle } from "@phosphor-icons/react";
import { Skeleton } from "antd";
import { Loading } from "../../hooks";
import * as S from "./styles";

interface AssetInfoProps {
  name: string | undefined;
  model: string | undefined;
  status: string | undefined;
}

export function AssetInfo({ name, model, status }: AssetInfoProps) {
  const { isLoading } = Loading.useLoading();
  return (
    <S.Info>
      <Skeleton
        loading={isLoading}
        style={{ width: "140px" }}
        paragraph={{ rows: 2 }}
        title={false}
      >
        <div>
          <p>Name: {name}</p>
          <p>Model: {model} </p>
        </div>
        {status === "inAlert" && <WarningCircle size={32} color="#C11574" />}
        {status === "inDowntime" && <StopCircle size={32} color="#cab02b" />}
        {status === "inOperation" && <CheckCircle size={32} color="#027a48" />}
      </Skeleton>
    </S.Info>
  );
}
