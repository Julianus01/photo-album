import React, { useEffect, useState } from 'react'
import AlbumEndpoints from '../api/AlbumEndpoints'
import styled from 'styled-components'
import { Div, Title, Button } from 'styled'
import { Link } from 'react-router-dom'

const AlbumPage = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    AlbumEndpoints.getAlbum(match.params.name).then(result => {
      setAlbum(result)
      setLoading(false)
    })
  }, [match.params.name])

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

          <Actions>
            <Button style={{ width: 'fit-content' }} onClick={null}>
              add photo
            </Button>
          </Actions>
        </Header>

        <Content>test</Content>
      </Container>
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
