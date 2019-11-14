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

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-top: 0;
`

export const Text = styled.p`
  font-size: 20px;
  margin-top: 0;
`

export const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  border-radius: 10px;
  color: white;
  border: 0;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  transition: transform 0.15s ease-in-out;
  padding: 12px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
  }
`
