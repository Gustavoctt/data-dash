import styled from "styled-components";
import Box from "../../components/Box";
import { Avatar } from "antd";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 240px;

  padding: 20px;

  @media (max-width: 760px) {
    margin-left: 160px;
    overflow: hidden;
  }
`;

export const AssetBox = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const ContentLeft = styled.div`
  max-width: 344px;
  height: auto;
`;

export const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentMachineData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const AllData = styled.div`
  display: flex;
  gap: 60px;
`;

export const DataLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MachineData = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 16px;
  }
`;

export const Specification = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const SpecificationData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  div {
    p {
      font-size: 14px;
    }
    span {
      font-size: 12px;
    }
  }
`;

export const HealthBox = styled.div`
  margin-top: 16px;
`;

export const DataRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const AssignedUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  div {
    display: flex;
    gap: 6px;
  }
`;

export const AvatarComponent = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-800);
`;

export const Graphics = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  gap: 24px;
`;

export const ListService = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--gray-300);
  gap: 24px;
  padding: 10px 12px;
  border-radius: 8px;
  align-items: center;

  + div {
    margin-top: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 300px;

  th {
    background-color: #f3f6f9;
    padding: 1rem;
    text-align: left;
    color: #464e5f;
    font-size: 0.75rem;
    line-height: 1.4;
    &:first-child {
      border-top-left-radius: 8px;
      padding: 1rem;
    }
    &:last-child {
      border-top-right-radius: 8px;
      padding: 1rem;
    }
  }
  tr {
    background-color: #fcfcfc;
    &:nth-child(even) {
      background-color: #f7f7f7;
    }
  }
  td {
    padding: 1rem;
    text-align: left;
    color: #464e5f;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;
