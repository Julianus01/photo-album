import React, { useState } from 'react'
import { Div, Button, Input, Text } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from 'hooks'

const CreateAlbumModal = ({ isOpen, onClose, onSuccess }) => {
  const [errorMessage, showError, hideError] = useTemporaryMessage()
  const [albumName, setAlbumName] = useState('')
  const [loading, setLoading] = useState(false)

  const createAlbum = async () => {
    try {
      hideError()

      setLoading(true)
      const newAlbum = await AlbumEndpoints.createAlbum(albumName)
      setLoading(false)

      onSuccess(newAlbum)
      setAlbumName('')
      onClose()
    } catch (error) {
      showError(error)
      setLoading(false)
    }
  }

  const closeModal = () => {
    hideError()
    setAlbumName('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Div box>
        <Content>
          <Input
            style={{ width: '100%' }}
            inputStyle={{ width: '100%' }}
            value={albumName}
            onChange={({ target: { value } }) => setAlbumName(value)}
            disabled={loading}
            placeholder='Album name'
            onKeyPress={({ key }) => key === 'Enter' && createAlbum()}
          />

          <CreateButton onClick={createAlbum} disabled={albumName.length < 3 || loading}>
            create
          </CreateButton>
        </Content>

        {errorMessage && <Error>{errorMessage}</Error>}
      </Div>
    </Modal>
  )
}

export default CreateAlbumModal

const Content = styled(Div).attrs({ box: true })`
  display: flex;
`

const Error = styled(Text)`
  color: red;
  font-size: 14px;
`

const CreateButton = styled(Button)`
  margin-left: auto;
  width: fit-content;
`
