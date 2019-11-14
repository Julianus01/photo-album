import React, { useEffect, useState } from 'react'
import { Div, Title, Button } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'

const AlbumsPage = () => {
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    AlbumEndpoints.getAlbums().then(result => {
      setAlbums(result)
      setLoading(false)
    })
  }, [])

  return (
    <Page>
      <Container>
        <Header>
          <Title style={{ marginBottom: 0 }}>My albums</Title>

          <Actions>
            <Button>create</Button>
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
  overflow: auto;
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
