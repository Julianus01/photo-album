import React from 'react'
import styled from 'styled-components'
import { Div, Title, Button } from 'styled'

const NoPhotos = ({ onBrowse }) => (
  <NoPhotosContainer>
    <Description>Drag&Drop image here or</Description>
    <Button onClick={onBrowse}>Browse</Button>
  </NoPhotosContainer>
)

export default NoPhotos

const NoPhotosContainer = styled(Div)`
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Description = styled(Title)`
  margin-bottom: 0;
  margin-right: 20px;
`
