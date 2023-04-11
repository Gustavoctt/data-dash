import styled from "styled-components";
import Box from "../../components/Box";

import { Avatar } from "antd";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 240px;

  @media (max-width: 760px) {
    margin-left: 160px;
    overflow: hidden;
  }
`;

export const ContainerRigth = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 20px 40px;

  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const AssetData = styled.div`
  display: flex;
  gap: 24px;
`;

export const Specifications = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 24px;
`;

export const CompanyInfo = styled(Box)`
  display: flex;
  width: fit-content;
  justify-content: center;
`;

export const MachineInfo = styled.div`
  display: flex;
  margin-top: 24px;
  width: fit-content;
  gap: 1rem;
`;

export const Content = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
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

export const AvatarComponent = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0 0 6px;
`;
