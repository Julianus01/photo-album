import React from 'react'
import styled from 'styled-components'
import { Div, Title, Button } from 'styled'

const NotFoundPage = ({ history }) => {
  return (
    <Container>
      <Title style={{ fontSize: 120 }}>404</Title>
      <Button onClick={() => history.push('/')}>Go home</Button>
    </Container>
  )
}

export default NotFoundPage

const Container = styled(Div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
