import React from 'react'
import styled, { css } from 'styled-components'
import { Div, Text } from 'styled'
import { Delete as DeleteIcon, Edit2 as EditIcon } from 'react-feather'
import fp from 'lodash/fp'

const readableBytes = bytes => {
  if (!bytes) return
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i]
}

const Photo = ({ photo, stageForDeletion, stageForEdit, stageForPreview, isListView }) => {
  const stopPropagationCallback = callback => event => {
    event.stopPropagation()
    callback()
  }

  return (
    <Container onClick={() => stageForPreview(photo)}>
      <Absolute>
        <div>
          <Name isListView={isListView}>{photo.name}</Name>
          {isListView && (
            <Text style={{ color: 'white' }}>{readableBytes(fp.getOr(0, 'size')(photo))}</Text>
          )}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <EditIcon
            onClick={stopPropagationCallback(() => stageForEdit(photo))}
            size={16}
            style={{ marginRight: 20 }}
          />
          <DeleteIcon onClick={stopPropagationCallback(() => stageForDeletion(photo))} size={16} />
        </div>
      </Absolute>

      <Image src={photo.src} />
    </Container>
  )
}

export default Photo

const Container = styled(Div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  :hover {
    img {
      transform: scale(1.05);
    }

    svg {
      opacity: 1;
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
`

const Image = styled.img`
  width: 100%;
  height: 100%;
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
  margin-bottom: 5px;

  ${({ isListView }) =>
    isListView &&
    css`
      font-size: 30px;
    `}
`
