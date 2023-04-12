import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 240px;
  padding: 24px;

  @media (max-width: 760px) {
    margin-left: 160px;
    overflow: hidden;
  }
`;

export const ContentBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 0fr 1fr;
  }
`;

export const ContentAsset = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MachineData = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleMachine = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const Specifications = styled.div`
  margin-top: 24px;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 8px;
  }
`;

export const UsersAssigned = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 4px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

export const OrderData = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterData = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const WorkOrder = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  background: var(--gray-400);
  align-items: center;
  border-radius: 8px;
  padding: 4px 8px;
`;
