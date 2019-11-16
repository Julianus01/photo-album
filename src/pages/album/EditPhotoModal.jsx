import React, { useState, useEffect } from 'react'
import { Div, Button, Text, Input } from 'styled'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from 'hooks'
import AlbumEndpoints from 'api/AlbumEndpoints'

const EditPhotoModal = ({ isOpen, onClose, photo, albumId, onUpdate }) => {
  const [errorMessage, showError, hideError] = useTemporaryMessage()
  const [loading, setLoading] = useState(false)
  const [photoName, setPhotoName] = useState(photo.name)

  useEffect(() => {
    setPhotoName(photo.name)
  }, [photo])

  const saveAlbum = async () => {
    try {
      hideError()

      setLoading(true)
      const updatedAlbum = { ...photo, name: photoName }
      await AlbumEndpoints.updatePhoto(albumId, photo.id, updatedAlbum)
      setLoading(false)
      onUpdate && onUpdate(updatedAlbum)
    } catch (error) {
      showError(error)
      setLoading(false)
    }
  }

  const closeModal = () => {
    setPhotoName(photo.name)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Div onClick={event => event.stopPropagation()} box>
        <Content>
          <Input
            style={{ width: '100%' }}
            inputStyle={{ width: '100%' }}
            value={photoName}
            onChange={({ target: { value } }) => setPhotoName(value)}
            disabled={loading}
            placeholder='Album name'
            onKeyPress={({ key }) => key === 'Enter' && saveAlbum()}
          />

          <EditButton
            onClick={saveAlbum}
            disabled={loading || photoName.length < 3 || photoName === photo.name}
          >
            save
          </EditButton>
        </Content>

        {errorMessage && <Error>{errorMessage}</Error>}
      </Div>
    </Modal>
  )
}

export default EditPhotoModal

const Content = styled(Div).attrs({ box: true })`
  display: flex;
  align-items: center;
`

const Error = styled(Text)`
  color: red;
  font-size: 14px;
`

const EditButton = styled(Button)`
  margin-left: auto;
  width: fit-content;
`
