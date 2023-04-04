import styled, { css } from "styled-components";

const STATUS_COLORS = {
  yellow: "#B54708",
  green: "#027a48",
  red: "#C11574",
} as const;

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  ${({ statusColor }) => {
    return css`
      display: flex;
      align-items: center;
      gap: 0.5rem;

      width: fit-content;
      color: ${statusColor && [STATUS_COLORS[statusColor]]};
      background-color: ${statusColor && `${[STATUS_COLORS[statusColor]]}1a`};
      padding: 2px 8px;
      border-radius: 8px;
    `;
  }}
`;
