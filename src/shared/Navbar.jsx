import React, { useContext } from 'react'
import { Div, Text } from 'styled'
import styled from 'styled-components'
import ThemeContext from 'context/themeContext'
import { Sun, Moon } from 'react-feather'

const Navbar = ({ showShadow }) => {
  const {
    theme,
    actions: { triggerTheme }
  } = useContext(ThemeContext)

  return (
    <Container showShadow={showShadow}>
      <Content>
        <Text style={{ fontWeight: 'bold', marginBottom: 0 }}>albump.</Text>

        <IconContainer onClick={() => triggerTheme()} style={{ padding: 8 }}>
          {theme.name === 'light' ? <Sun /> : <Moon />}
        </IconContainer>
      </Content>
    </Container>
  )
}

export default Navbar

const Container = styled(Div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${({ theme }) => theme.background_blur};
  backdrop-filter: saturate(180%) blur(20px);
`

const IconContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: auto;
`

const Content = styled.div`
  max-width: 1000px;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
`
