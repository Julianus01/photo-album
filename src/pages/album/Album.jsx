import React, { useState } from 'react'
import styled from 'styled-components'
import { Div, Subtitle } from 'styled'
import { Delete as DeleteIcon, Edit2 as EditIcon } from 'react-feather'
import DeleteModal from 'shared/DeleteModal'
import AlbumEndpoints from '../../api/AlbumEndpoints'
import EditAlbumModal from './EditAlbumModal'
import NoPhoto from './NoPhoto'
import AlbumThumbnail from './AlbumThumbnail'

const Album = ({ album, onAlbumDeleted, onAlbumUpdated, ...rest }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const onDelete = async () => {
    await AlbumEndpoints.deleteAlbum(album.id)
    onAlbumDeleted(album.id)
  }

  return (
    <Container {...rest}>
      <div
        style={{
          flex: 1,
          width: '100%',
          height: 300
        }}
      >
        {album && !album.photos.length ? <NoPhoto /> : <AlbumThumbnail photos={album.photos} />}
      </div>

      <Description onClick={event => event.stopPropagation()}>
        <Subtitle>{album.name}</Subtitle>

        <Actions>
          <EditIcon onClick={() => setEditModal(true)} style={{ marginRight: 20 }} size={16} />
          <DeleteIcon onClick={() => setDeleteModal(true)} size={16} />
        </Actions>
      </Description>

      <DeleteModal
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
      />
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
