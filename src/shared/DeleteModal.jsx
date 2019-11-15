import React, { useState } from 'react'
import { Div, Button, Text } from 'styled'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { useTemporaryMessage } from 'hooks'

const DeleteModal = ({ isOpen, onClose, onDelete, message }) => {
  const [errorMessage, showError, hideError] = useTemporaryMessage()
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    try {
      hideError()

      setLoading(true)
      await onDelete()
    } catch (error) {
      showError(error)
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <Div onClick={event => event.stopPropagation()} box>
        <Content>
          <Text style={{ marginBottom: 0 }}>{message}</Text>

          <DeleteButton onClick={onConfirm} disabled={loading}>
            delete
          </DeleteButton>
        </Content>

        {errorMessage && <Error>{errorMessage}</Error>}
      </Div>
    </Modal>
  )
}

export default DeleteModal

const Content = styled(Div).attrs({ box: true })`
  display: flex;
  align-items: center;
`

const Error = styled(Text)`
  color: red;
  font-size: 14px;
`

const DeleteButton = styled(Button)`
  margin-left: auto;
  width: fit-content;
`
