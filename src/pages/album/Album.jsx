import React from 'react'
import styled from 'styled-components'
import { Div, Subtitle } from 'styled'
import { Delete as DeleteIcon, Edit2 as EditIcon } from 'react-feather'
import NoPhoto from './NoPhoto'
import AlbumThumbnail from './AlbumThumbnail'
import fp from 'lodash/fp'

const Album = ({ album, stageForDeletion, stageForEdit, ...rest }) => (
  <Container {...rest}>
    <PhotosContainer>
      {!fp.get('photos.length')(album) ? <NoPhoto /> : <AlbumThumbnail photos={album.photos} />}
    </PhotosContainer>

    <Description onClick={event => event.stopPropagation()}>
      <Subtitle>{album.name}</Subtitle>

      <Actions>
        <EditIcon onClick={() => stageForEdit(album)} style={{ marginRight: 20 }} size={16} />
        <DeleteIcon onClick={() => stageForDeletion(album)} size={16} />
      </Actions>
    </Description>
  </Container>
)

export default Album

const Container = styled(Div)`
  svg {
    opacity: 0;
  }

  :hover {
    svg {
      opacity: 1;
    }
  }
`

const PhotosContainer = styled(Div)`
  flex: 1;
  width: 100%;
  height: 300px;
`

const Description = styled(Div)`
  display: flex;
  padding-top: 20px;
`

const Actions = styled(Div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`
