import styled from "styled-components";
import Box from "../Box";

export const Info = styled(Box)`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
  }
`;
