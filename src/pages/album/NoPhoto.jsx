import React from 'react'
import styled from 'styled-components'
import { Image as ImageIcon } from 'react-feather'
import { Div, Text } from 'styled'

const NoPhoto = ({ text, border, ...rest }) => (
  <NoPhotosContainer border={border} {...rest}>
    <ImageIcon />
    {text && <Text>{text}</Text>}
  </NoPhotosContainer>
)

export default NoPhoto

const NoPhotosContainer = styled(Div)`
  background-color: ${({ theme }) => theme.neutral};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ border, theme }) => (border ? `1px solid ${theme.placeholder}` : 0)};
`
