import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 240px;

  @media (max-width: 760px) {
    margin-left: 160px;
    overflow: hidden;
  }
`;

export const Content = styled.div`
  width: 100vw;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 760px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
