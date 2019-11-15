import React, { useState } from 'react'
import { Div, Button, Input, Text } from 'styled'
import styled from 'styled-components'
import AlbumEndpoints from 'api/AlbumEndpoints'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from '../../hooks'

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Div box>
        <Content>
          <Input
            variant='secondary'
            value={albumName}
            onChange={({ target: { value } }) => setAlbumName(value)}
            disabled={loading}
            placeholder='Album name'
            onKeyPress={({ key }) => key === 'Enter' && createAlbum()}
          />

          <Button
            onClick={createAlbum}
            disabled={albumName.length < 3 || loading}
            style={{ marginLeft: 'auto', width: 140 }}
          >
            create
          </Button>
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
  margin-left: 20px;
`
