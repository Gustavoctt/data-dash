import styled, { css } from "styled-components";

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 240px;
  height: 100vh;
  position: fixed;

  background-color: var(--white);
  z-index: 1000;

  a {
    text-decoration: none;
  }

  img {
    display: flex;
  }

  @media (max-width: 760px) {
    width: 160px;
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
    color: ${isSelected ? "var(--blue)" : "var(--gray-700)"};
    background-color: ${isSelected && "var(--gray-200)"};
    margin-top: 8px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: #f7f7fb;
    }

    ${isSelected &&
    css`
      &::after {
        position: absolute;
        right: 0;
        content: "";
        width: 4px;
        border-radius: 4px 0 0 4px;
        height: 48px;
        z-index: 1000;
        background-color: var(--blue);
      }
    `}

    @media (max-width: 760px) {
      padding: 8px 0px 8px 16px;
    }
  `}
`;
