import React from 'react'
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

export const Subtitle = styled.h2`
  font-size: 20px;
  margin-top: 0;
  font-weight: 400;
`

export const Text = styled.p`
  font-size: 16px;
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
  padding: 14px 20px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'PT Sans', sans-serif;

  transition: all 0.3s ease-in-out;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.disabled};
      box-shadow: none;
      pointer-events: none;
    `}
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.grey_light};
      padding: 3px 20px;
      border-radius: 15px;
    `}
`

const TextInput = styled.input`
  border: 0;
  font-weight: bold;
  background-color: transparent;
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  border-radius: 10px;

  ::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  &:disabled {
    background-color: transparent;
  }
`

export const Input = ({ icon, style, inputStyle, variant, ...restProps }) => (
  <InputContainer variant={variant} style={style}>
    {icon}
    <TextInput variant={variant} style={inputStyle} {...restProps} />
  </InputContainer>
)
