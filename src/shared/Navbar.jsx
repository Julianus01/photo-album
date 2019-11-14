import React, { useContext } from 'react'
import { Div, Text } from 'styled'
import styled from 'styled-components'
import ThemeContext from 'context/themeContext'
import { Sun, Moon } from 'react-feather'

const Navbar = () => {
  const {
    theme,
    actions: { triggerTheme }
  } = useContext(ThemeContext)

  return (
    <Container>
      <Text style={{ fontWeight: 'bold' }}>albump.</Text>

      <IconContainer onClick={() => triggerTheme()} style={{ padding: 8 }}>
        {theme.name === 'light' ? <Sun /> : <Moon />}
      </IconContainer>
    </Container>
  )
}

export default Navbar

const Container = styled(Div)`
  max-width: 1000px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconContainer = styled(Div)`
  cursor: pointer;
  padding: 10px;
  margin-left: auto;
`
