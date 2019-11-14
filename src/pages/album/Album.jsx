import React from 'react'
import styled from 'styled-components'
import { Div, Text } from 'styled'
import { Image as ImageIcon } from 'react-feather'

const NoPhotos = () => (
  <NoPhotosContainer>
    <ImageIcon />
  </NoPhotosContainer>
)

const NoPhotosContainer = styled(Div)`
  background-color: ${({ theme }) => theme.neutral};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Album = ({ album, style }) => {
  return (
    <Container style={style}>
      <div
        style={{
          flex: 1,
          width: '100%',
          marginBottom: 20,
          height: 300
        }}
      >
        {!album.photos ? <NoPhotos /> : <div>photos</div>}
      </div>
      <Text>{album.name}</Text>
    </Container>
  )
}

export default Album

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
`
