import * as S from "./styles";

interface StatusProps {
  status:
    | "inDowntime"
    | "inOperation"
    | "inAlert"
    | "plannedStop"
    | "unplannedStop";
}

export function Status({ status }: StatusProps) {
  return <S.Status statusColor={status}>{status}</S.Status>;
}
