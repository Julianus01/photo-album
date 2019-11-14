import React, { useEffect, useState } from 'react'
import { Div, Title, Button, Input } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'
import Modal from 'shared/Modal'

const AlbumsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState([])
  const [newAlbumName, setNewAlbumName] = useState('')

  useEffect(() => {
    AlbumEndpoints.getAlbums().then(result => {
      setAlbums(result)
      setLoading(false)
    })
  }, [])

  return (
    <Page>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <Input
            variant='secondary'
            value={newAlbumName}
            onChange={({ target: { value } }) => setNewAlbumName(value)}
            autoFocus
            disabled={loading}
            placeholder='Album name'
          />
          <Button disabled={newAlbumName.length < 3} style={{ marginLeft: 'auto', width: 140 }}>
            add
          </Button>
        </ModalContent>
      </Modal>

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
            <>
              <div style={{ border: '1px solid black' }}></div>
              <div style={{ border: '1px solid black' }}></div>
              <div style={{ border: '1px solid black' }}></div>
              <div style={{ border: '1px solid black' }}></div>
              <div style={{ border: '1px solid black' }}></div>
              <div style={{ border: '1px solid black' }}></div>
            </>
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
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 500px;
  grid-gap: 20px;
`

const ModalContent = styled(Div).attrs({ box: true })`
  display: flex;
`
