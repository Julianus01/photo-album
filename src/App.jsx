import React from 'react'
import { Div } from 'styled'
import styled from 'styled-components'
import { Navbar } from 'shared'
import AlbumsPage from './pages/AlbumsPage'
import Routes from './routes'

const App = () => {
  return <Routes />
}

export default App

const Page = styled(Div)`
  height: 100%;
  width: fill-available;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`

const Content = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`
