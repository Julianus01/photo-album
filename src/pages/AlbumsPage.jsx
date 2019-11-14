import React, { useEffect, useState } from 'react'
import { Div, Title, Button } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'
import CreateAlbumModal from './album/CreateAlbumModal'
import Album from './album/Album'

const AlbumsPage = () => {
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
            <Button onClick={() => setIsOpen(true)}>create</Button>
          </Actions>
        </Header>

        <Content>
          {loading ? null : !albums.length ? (
            <div>No albums</div>
          ) : (
            albums.map(album => <Album style={{ marginBottom: 60 }} key={album.id} album={album} />)
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
  max-width: 1000px;
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
