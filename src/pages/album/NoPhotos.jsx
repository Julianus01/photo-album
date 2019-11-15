import React from 'react'
import styled from 'styled-components'
import { Div, Title, Button } from 'styled'

const NoPhotos = ({ onBrowse }) => (
  <NoPhotosContainer>
    <Title>Drag&Drop image here or</Title>
    <Button flat onClick={onBrowse}>
      Browse
    </Button>
  </NoPhotosContainer>
)

export default NoPhotos

const NoPhotosContainer = styled(Div)`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
