import React, { useState, useEffect } from 'react'
import { Div, Button, Text, Input } from 'styled'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from 'hooks'
import NoPhoto from './NoPhoto'

const AddPhotoModal = ({ isOpen, onClose, dragFile, name }) => {
  const [errorMessage, showError, hideError] = useTemporaryMessage()
  const [loading, setLoading] = useState(false)
  const [photoName, setPhotoName] = useState('')
  const [photoFile, setPhotoFile] = useState(dragFile)

  useEffect(() => setPhotoFile(dragFile), [dragFile])

  const onSelectedPhoto = ({ target: { files } }) => {
    setPhotoFile(files[0])
  }

  const closeModal = () => {
    setPhotoName('')
    setPhotoFile(null)
    onClose()
  }

  const addPhoto = async () => {}

  return (
    <Modal contentStyle={{ maxWidth: 300 }} isOpen={isOpen} onClose={closeModal}>
      <Div onClick={event => event.stopPropagation()} box>
        <Content>
          <Input
            value={photoName}
            onChange={({ target: { value } }) => setPhotoName(value)}
            disabled={loading}
            placeholder='Photo name'
            onKeyPress={({ key }) => key === 'Enter' && addPhoto()}
          />

          <PhotoContainer>
            {!photoFile && (
              <Absolute>
                <NoPhoto border text='Browse an image' />
              </Absolute>
            )}
            <ImgInput type='file' onChange={onSelectedPhoto} />

            {photoFile && <ImgPreview src={URL.createObjectURL(photoFile)} />}
          </PhotoContainer>

          <AddButton onClick={addPhoto} disabled={loading || photoName.length < 3 || !photoFile}>
            add photo
          </AddButton>
        </Content>

        {errorMessage && <Error>{errorMessage}</Error>}
      </Div>
    </Modal>
  )
}

export default AddPhotoModal

const Content = styled(Div).attrs({ box: true })`
  display: flex;
  flex-direction: column;
`

const Error = styled(Text)`
  color: red;
  font-size: 14px;
`

const AddButton = styled(Button)`
  margin-left: auto;
  width: 100%;
`

const PhotoContainer = styled(Div).attrs({ box: true })`
  min-height: 200px;
  margin: 20px 0;
  position: relative;
  display: flex;
`

const ImgPreview = styled.img`
  width: 100%;
  height: auto;
  height: 100%;
  max-height: 400px;
  object-fit: contain;
`

const ImgInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`

const Absolute = styled(Div).attrs({ box: true })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
