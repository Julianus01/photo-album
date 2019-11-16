import React, { useState, useEffect } from 'react'
import { Div, Button, Text, Input } from 'styled'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from 'hooks'
import AlbumEndpoints from 'api/AlbumEndpoints'

const EditAlbumModal = ({ isOpen, onClose, album, onUpdate }) => {
  const [errorMessage, showError, hideError] = useTemporaryMessage()
  const [loading, setLoading] = useState(false)
  const [albumName, setAlbumName] = useState(album.name)

  useEffect(() => {
    setAlbumName(album.name)
  }, [album])

  const saveAlbum = async () => {
    try {
      hideError()

      setLoading(true)
      const updatedAlbum = { ...album, name: albumName }
      await AlbumEndpoints.updateAlbum(album.id, updatedAlbum)
      setLoading(false)
      onUpdate && onUpdate(updatedAlbum)
    } catch (error) {
      showError(error)
      setLoading(false)
    }
  }

  const closeModal = () => {
    setAlbumName(album.name)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Div onClick={event => event.stopPropagation()} box>
        <Content>
          <Input
            style={{ width: '100%' }}
            inputStyle={{ width: '100%' }}
            value={albumName}
            onChange={({ target: { value } }) => setAlbumName(value)}
            disabled={loading}
            placeholder='Album name'
            onKeyPress={({ key }) => key === 'Enter' && saveAlbum()}
          />

          <EditButton
            onClick={saveAlbum}
            disabled={loading || albumName.length < 3 || albumName === album.name}
          >
            save
          </EditButton>
        </Content>

        {errorMessage && <Error>{errorMessage}</Error>}
      </Div>
    </Modal>
  )
}

export default EditAlbumModal

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
