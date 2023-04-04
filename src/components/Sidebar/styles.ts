import styled, { css } from "styled-components";

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  height: 100vh;
  position: fixed;

  padding-top: 90px;
  background-color: #ffffff;

  a {
    text-decoration: none;
  }
`;

type SidebarProps = {
  isSelected: boolean;
};

export const SidebarContent = styled.div<SidebarProps>`
  ${({ isSelected }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 0px 12px 24px;

    gap: 0.85rem;
    color: ${isSelected ? "#0D0D54" : "#4f5b67"};
    background-color: ${isSelected && "#F7F7FB"};
    margin-top: 8px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: #f7f7fb;
    }
  `}
`;
