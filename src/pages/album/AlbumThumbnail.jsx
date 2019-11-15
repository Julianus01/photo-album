import React from 'react'
import styled, { css } from 'styled-components'
import { Div } from 'styled'

const AlbumThumbnail = ({ photos }) => {
  return (
    <Container elements={photos.length}>
      <Absolute />

      {photos.map(photo => (
        <div key={photo.id} style={{ overflow: 'hidden' }}>
          <Image src={photo.src} />
        </div>
      ))}
    </Container>
  )
}

export default AlbumThumbnail

const Container = styled(Div)`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  background-color: black;
  position: relative;

  ${({ elements }) => {
    if (elements === 1) {
      return css`
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
      `
    }
  }}
`

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

const Absolute = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  padding: 20px;
`
