import React from 'react'
import { Div } from 'styled'
import styled from 'styled-components'
import { Navbar } from 'shared'
import AlbumsPage from './pages/AlbumsPage'

const App = () => {
  return (
    <Page>
      <Navbar />
      <Content>
        <AlbumsPage />
      </Content>
    </Page>
  )
}

export default App

const Page = styled(Div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`
