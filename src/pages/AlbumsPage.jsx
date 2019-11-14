import React from 'react'
import { Div, Title, Button, Text } from 'styled'
import styled from 'styled-components'

const AlbumsPage = () => {
  return (
    <Div>
      <Header>
        <Title style={{ marginBottom: 0 }}>My albums</Title>

        <Actions>
          <Button>create</Button>
        </Actions>
      </Header>

      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veritatis eius hic, delectus
        officiis veniam.
      </Text>
    </Div>
  )
}

export default AlbumsPage

const Header = styled(Div)`
  display: flex;
  margin-bottom: 30px;
`

const Actions = styled(Div)`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`
