import React, { createContext, useState } from 'react'
import { lightTheme, darkTheme } from 'theme'

const getTheme = () => {
  const localStorageTheme = JSON.parse(localStorage.getItem('theme'))
  return localStorageTheme ? localStorageTheme : lightTheme
}

const ThemeContext = createContext()

const ThemeContextConsumer = ThemeContext.Consumer
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme())

  const triggerTheme = () => {
    if (theme.name === 'light') {
      setTheme(darkTheme)
      localStorage.setItem('theme', JSON.stringify(darkTheme))
      return
    }

    setTheme(lightTheme)
    localStorage.setItem('theme', JSON.stringify(lightTheme))
    return
  }

  return (
    <ThemeContext.Provider value={{ theme, actions: { triggerTheme } }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextConsumer }
export { ThemeContextProvider }
export default ThemeContext
