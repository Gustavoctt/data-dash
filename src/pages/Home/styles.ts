import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100vw;
`;

export const Box = styled.div`
  width: 100%;
  gap: 1.25rem;
  padding: 16px;
  display: flex;
  margin-top: 2rem;
  border-radius: 12px;
  flex-direction: column;
  background-color: #202024;
`;

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: #4f5b67;
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
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
        width: 10%;
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
  }
`;

export const Status = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: fit-content;
  color: #027a48;
  background-color: #027a481a;
  padding: 2px 8px;
  border-radius: 8px;
`;

export const Button = styled(Link)`
  text-decoration: none;
  background-color: #0d0d54;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  color: #fafafa;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
`;
