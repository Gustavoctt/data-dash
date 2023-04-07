import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 240px;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100vw;
`;

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  h2 {
    color: var(--gray-700);
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  input {
    margin-bottom: 2rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    th {
      background-color: var(--gray-300);
      padding: 1rem;
      text-align: left;
      color: var(--gray-700);
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
      background-color: var(--gray-100);
      &:nth-child(even) {
        background-color: var(--gray-200);
      }
    }
    td {
      padding: 1rem;
      text-align: left;
      color: var(--gray-700);
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }
`;

export const Button = styled(Link)`
  text-decoration: none;
  background-color: var(--blue);
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  color: #fafafa;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
`;
