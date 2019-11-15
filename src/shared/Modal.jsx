import React, { useRef } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { Div } from 'styled'
import { useClickAway } from 'react-use'

const modalStyles = {
  content: {
    border: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.58)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

Modal.setAppElement('#root')

export default ({ isOpen, onClose, children, contentStyle }) => {
  const ref = useRef(null)
  useClickAway(ref, () => onClose())

  return (
    <Modal style={modalStyles} isOpen={isOpen} contentLabel='Example Modal'>
      <ModalContent onClick={event => event.stopPropagation()} box ref={ref} style={contentStyle}>
        {children}
      </ModalContent>
    </Modal>
  )
}

const ModalContent = styled(Div)`
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
`
