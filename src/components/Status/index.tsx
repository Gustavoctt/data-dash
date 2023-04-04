import * as S from "./styles";

enum StatusTypes {
  "inAlert" = "Em Alerta",
  "inOperation" = "Em Operação",
  "inDowntime" = "Em Parada",
  "plannedStop" = "Parada planejada",
  "unplannedStop" = "Parada não planejada",
}

interface StatusProps {
  status: keyof typeof StatusTypes;
}

export function Status({ status }: StatusProps) {
  return <S.Status statusColor={status}>{StatusTypes[status]}</S.Status>;
}
