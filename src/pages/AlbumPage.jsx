import React, { useEffect, useState } from 'react'
import AlbumEndpoints from '../api/AlbumEndpoints'
import styled, { css } from 'styled-components'
import { Div, Title, Button } from 'styled'
import { Link } from 'react-router-dom'
import { useDropArea } from 'react-use'
import NoPhotos from './album/NoPhotos'
import AddPhotoModal from './album/AddPhotoModal'
import fp from 'lodash/fp'
import Photo from './album/Photo'
import DeleteModal from 'shared/DeleteModal'
import Fade from 'react-reveal/Fade'
import { List as ListIcon, Grid as GridIcon } from 'react-feather'

const AlbumPage = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState(null)
  const [dragFile, setDragFile] = useState(null)
  const [addPhotoModal, setAddPhotoModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [photoToDelete, setPhotoToDelete] = useState(null)
  const [viewOption, setViewOption] = useState('grid')

  const [bond] = useDropArea({
    onFiles: ([file]) => {
      setAddPhotoModal(true)
      setDragFile(file)
    }
  })

  useEffect(() => {
    AlbumEndpoints.getAlbum(match.params.name).then(result => {
      setAlbum(result)
      setLoading(false)
    })
  }, [match.params.name])

  const onAddedPhoto = photo => setAlbum({ ...album, photos: [photo, ...album.photos] })

  const stageForDeletion = photo => {
    setPhotoToDelete(photo)
    setDeleteModal(true)
  }

  const onDeletePhoto = async () => {
    await AlbumEndpoints.deletePhoto(album.id, photoToDelete.id)
    setAlbum({ ...album, photos: album.photos.filter(({ id }) => id !== photoToDelete.id) })
    setPhotoToDelete(null)
  }

  const photos = fp.getOr([], 'photos')(album)

  return (
    <Page>
      <Container>
        <Header>
          <Div style={{ display: 'flex' }}>
            <Href to='/albums'>
              <Title style={{ marginBottom: 0 }}>My albums </Title>
            </Href>
            <span>
              <Title style={{ marginBottom: 0 }}>> {match.params.name}</Title>
            </span>
          </Div>

          {photos.length ? (
            <Actions>
              <IconContainer onClick={() => setViewOption('list')} active={viewOption === 'list'}>
                <ListIcon />
              </IconContainer>

              <IconContainer onClick={() => setViewOption('grid')} active={viewOption === 'grid'}>
                <GridIcon />
              </IconContainer>

              <Button onClick={() => setAddPhotoModal(true)} style={{ width: 'fit-content' }}>
                add photo
              </Button>
            </Actions>
          ) : null}
        </Header>

        {!loading && (
          <DropArea {...bond}>
            {!photos.length ? (
              <NoPhotos onBrowse={() => setAddPhotoModal(true)} />
            ) : (
              <Content viewOption={viewOption}>
                {album.photos.map(photo => (
                  <Fade key={photo.id}>
                    <Photo
                      isListView={viewOption === 'list'}
                      photo={photo}
                      deleteClicked={stageForDeletion}
                    />
                  </Fade>
                ))}
              </Content>
            )}
          </DropArea>
        )}
      </Container>

      <AddPhotoModal
        onSuccess={onAddedPhoto}
        album={album}
        dragFile={dragFile}
        onClose={() => setAddPhotoModal(false)}
        isOpen={addPhotoModal}
      />

      <DeleteModal
        onDelete={onDeletePhoto}
        message={`Delete photo '${fp.get('name')(photoToDelete)}'?`}
        onClose={() => setDeleteModal(false)}
        isOpen={deleteModal}
      />
    </Page>
  )
}

export default AlbumPage

const Page = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  margin-top: 50px;
`

const Href = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  margin-right: 10px;

  :hover {
    text-decoration: underline;
  }
`

const Container = styled(Div)`
  width: 100%;
  margin: 0 auto;
`

const Header = styled(Div)`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 30px;
`

const Actions = styled(Div)`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`

const DropArea = styled(Div)`
  width: 100%;
  min-height: 75vh;
  min-height: calc(var(--vh, 1vh) * 75);
  padding-bottom: 200px;
`

const Content = styled(Div)`
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-gap: 4px;

  ${({ viewOption }) => {
    if (viewOption === 'list') {
      return css`
        grid-template-columns: 500px;
        grid-auto-rows: 500px;
        justify-content: center;
      `
    }

    if (viewOption === 'grid') {
      return css`
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 300px;
      `
    }
  }}
`

const IconContainer = styled(Div)`
  padding: 10px;
  cursor: pointer;

  svg {
    margin-right: 10px;
    color: ${({ theme, active }) => (active ? theme.text.primary : theme.inactive)};
  }
`
