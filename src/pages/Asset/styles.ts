import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerRigth = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 20px 40px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Specifications = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 2rem;
`;

export const Box = styled.div`
  width: 100%;
  gap: 1rem;
  padding: 16px;
  display: flex;
  border-radius: 12px;
  flex-direction: column;
  background-color: #c1cad680;
`;

export const Content = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
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

type SpanProps = {
  color: string;
};

export const Span = styled.span<SpanProps>`
  color: #027a48;
  background-color: #027a481a;
  padding: 2px 8px;
  border-radius: 8px;
`;

export const Avatar = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0 0 6px;

  width: 40px;
  height: 40px;
  background: #ddff66;
  border-radius: 50%;
`;
