import React from 'react'
import styled, { css } from 'styled-components'
import { Div } from 'styled'

const AlbumThumbnail = ({ photos }) => {
  const photosToDisplay = photos.length === 4 ? photos : [photos[0]]

  return (
    <Container elements={photos.length}>
      <Absolute />

      {photosToDisplay.map(photo => (
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
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  background-color: black;
  position: relative;

  :hover {
    img {
      transform: scale(1.05);
    }
  }

  ${({ elements }) => {
    if (elements === 4) {
      return css`
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4px;
      `
    }
  }}
`

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  transition: transform 0.13s linear;
  -moz-transition: transform 0.15s linear;
  -webkit-transition: transform 0.15s linear;
  -o-transition: transform 0.15s linear;
  -ms-transition: transform 0.15s linear;
`

const Absolute = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
  display: flex;
  padding: 20px;
`
