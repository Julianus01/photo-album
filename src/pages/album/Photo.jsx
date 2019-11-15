import React from 'react'
import styled from 'styled-components'
import { Div, Text } from 'styled'
import { Delete as DeleteIcon } from 'react-feather'

const Photo = ({ photo }) => {
  return (
    <Container>
      <Absolute>
        <Name>{photo.name}</Name>

        <DeleteIcon size={16} />
      </Absolute>

      <Image src={photo.src} style={{ height: 300 }} />
    </Container>
  )
}

export default Photo

const Container = styled(Div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border: ${({ theme }) => `4px solid ${theme.photo_border}`};

  :hover {
    img {
      transform: scale(1.05);
    }
  }
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

  svg {
    cursor: pointer;
    color: white;
    opacity: 0;
    margin-left: auto;
  }

  :hover {
    svg {
      opacity: 1;
    }
  }
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

const Name = styled(Text)`
  color: white;
  font-weight: bold;
`
