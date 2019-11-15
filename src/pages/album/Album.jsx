import React, { useState } from 'react'
import styled from 'styled-components'
import { Div, Subtitle } from 'styled'
import { Delete as DeleteIcon, Edit2 as EditIcon } from 'react-feather'
import NoPhoto from './NoPhoto'
import AlbumThumbnail from './AlbumThumbnail'
import fp from 'lodash/fp'

const Album = ({ album, stageForDeletion, ...rest }) => {
  return (
    <Container {...rest}>
      <div
        style={{
          flex: 1,
          width: '100%',
          height: 300
        }}
      >
        {!fp.get('photos.length')(album) ? <NoPhoto /> : <AlbumThumbnail photos={album.photos} />}
      </div>

      <Description onClick={event => event.stopPropagation()}>
        <Subtitle>{album.name}</Subtitle>

        <Actions>
          <EditIcon onClick={() => stageForDeletion(album)} style={{ marginRight: 20 }} size={16} />
          <DeleteIcon onClick={() => stageForDeletion(album)} size={16} />
        </Actions>
      </Description>

      {/* <DeleteModal
        onDelete={onDelete}
        message={`Delete album '${album.name}'?`}
        onClose={() => setDeleteModal(false)}
        isOpen={deleteModal}
      />

      <EditAlbumModal
        onUpdate={onAlbumUpdated}
        isOpen={editModal}
        album={album}
        onClose={() => setEditModal(false)}
      /> */}
    </Container>
  )
}

export default Album

const Container = styled(Div)`
  display: flex;
  flex-direction: column;

  svg {
    opacity: 0;
  }

  :hover {
    svg {
      opacity: 1;
    }
  }
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
