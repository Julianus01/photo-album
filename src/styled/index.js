import styled, { css } from 'styled-components'

export const Div = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};

  transition: color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;

  border-radius: ${({ bordered }) => (bordered ? '10px' : 0)};

  ${({ theme, box }) =>
    box &&
    css`
      background-color: ${theme.background.box};
    `}
`
