import React, { useContext } from 'react'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { Text } from 'styled'
import ThemeContext from 'context/themeContext'

const PhotoModalPreview = ({ isOpen, onClose, src }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Modal
      style={{}}
      contentStyle={{
        maxWidth: 800,
        height: '90%',
        backgroundColor:
          theme.name === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.88)'
      }}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <Container onClick={event => event.stopPropagation()}>
        <Content>
          <ImageContainer>
            <div className='preview'></div>
            <img
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              alt='test'
              src={src}
            />
          </ImageContainer>

          <ColorContainer>
            <Text>Hello there</Text>
          </ColorContainer>
        </Content>
      </Container>
    </Modal>
  )
}

export default PhotoModalPreview

const Content = styled.div`
  display: flex;
  max-height: 500px;
  height: 100%;
  width: 100%;
  max-width: 700px;
`

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
`

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;
`

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
