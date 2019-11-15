import React, { useEffect, useState } from 'react'
import { Div, Title, Button } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'
import CreateAlbumModal from './album/CreateAlbumModal'
import Album from './album/Album'

const AlbumsPage = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    AlbumEndpoints.getAlbums().then(result => {
      setAlbums(result)
      setLoading(false)
    })
  }, [])

  const onAlbumCreated = newAlbum => {
    setAlbums([newAlbum, ...albums])
  }

  const onAlbumDeleted = albumId => {
    setAlbums(albums.filter(({ id }) => id !== albumId))
  }

  const onAlbumUpdated = updatedAlbum => {
    setAlbums(albums.map(album => (album.id === updatedAlbum.id ? updatedAlbum : album)))
  }

  return (
    <Page>
      <CreateAlbumModal
        onSuccess={onAlbumCreated}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Container>
        <Header>
          <Title style={{ marginBottom: 0 }}>My albums</Title>

          <Actions>
            <Button style={{ width: 'fit-content' }} onClick={() => setIsOpen(true)}>
              new album
            </Button>
          </Actions>
        </Header>

        <Content>
          {loading ? null : !albums.length ? (
            <div>No albums</div>
          ) : (
            albums.map(album => (
              <Album
                onAlbumUpdated={onAlbumUpdated}
                onAlbumDeleted={onAlbumDeleted}
                onClick={() => history.push(`albums/${album.name}`)}
                style={{ marginBottom: 60, cursor: 'pointer' }}
                key={album.id}
                album={album}
              />
            ))
          )}
        </Content>
      </Container>
    </Page>
  )
}

export default AlbumsPage

const Page = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  margin-top: 50px;
`

const Container = styled(Div)`
  width: 100%;
  margin: 0 auto;
`

const Header = styled(Div)`
  display: flex;
  margin-bottom: 30px;
`

const Actions = styled(Div)`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`

const Content = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  margin-bottom: 200px;
`
