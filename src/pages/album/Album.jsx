import React from 'react'
import styled from 'styled-components'
import { Div, Subtitle } from 'styled'

const Album = ({ album }) => {
  return (
    <Container>
      <div
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          border: '1px solid black',
          marginBottom: 20
        }}
      >
        img
      </div>
      <Subtitle>{album.name}</Subtitle>
    </Container>
  )
}

export default Album

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
`
