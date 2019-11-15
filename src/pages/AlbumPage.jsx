import React, { useEffect, useState } from 'react'
import AlbumEndpoints from '../api/AlbumEndpoints'
import styled from 'styled-components'
import { Div, Title, Button } from 'styled'
import { Link } from 'react-router-dom'
import { useDropArea } from 'react-use'
import NoPhotos from './album/NoPhotos'
import AddPhotoModal from './album/AddPhotoModal'

const AlbumPage = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState(null)
  const [dragFile, setDragFile] = useState(null)
  const [addPhotoModal, setAddPhotoModal] = useState(false)
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
      console.log(result)
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

        {/* <Content> */}
        <DropArea {...bond}>
          <NoPhotos onBrowse={() => setAddPhotoModal(true)} />
        </DropArea>
        {/* </Content> */}
      </Container>

      <AddPhotoModal
        album={album}
        dragFile={dragFile}
        onClose={() => setAddPhotoModal(false)}
        isOpen={addPhotoModal}
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
  align-items: flex-end;
`

const DropArea = styled(Div)`
  width: 100;
`

const Content = styled(Div)`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr 1fr; */
  display: flex;
  grid-gap: 40px;
  margin-bottom: 200px;
  max-width: 1000px;
`
