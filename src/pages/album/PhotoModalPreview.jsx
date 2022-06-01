import React, { useContext, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from 'shared/Modal'
import { Subtitle, Title } from 'styled'
import ThemeContext from 'context/themeContext'
import { X as XIcon } from 'react-feather'
import { useKey } from 'react-use'

const PhotoModalPreview = ({ isOpen, onClose, src }) => {
  const { theme } = useContext(ThemeContext)
  const canvas = useRef(null)
  const [color, setColor] = useState(theme.background.primary)
  useKey('Escape', onClose)

  useEffect(() => {
    const canvasRef = canvas
    if (!isOpen) return

    // canvas ref intiliazez only after complete render, setTimeout puts the stack in order
    setTimeout(() => {
      drawImageFromWebUrl(src, canvasRef.current)

      canvasRef.current.addEventListener(
        'mousemove',
        function (e) {
          let eventLocation = getEventLocation(this, e)
          let context = this.getContext('2d')
          let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data

          let hex = '#' + ('000000' + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6)
          setColor(hex)
        },
        false
      )
    }, 0)

    return () => {
      canvasRef.current.removeEventListener('mousemove', null, true)
    }
  }, [isOpen, src])

  return (
    <Modal
      style={{}}
      contentStyle={{
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        backgroundColor:
          theme.name === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.88)',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Container onClick={(event) => event.stopPropagation()}>
        <Header>
          <XIcon style={{ cursor: 'pointer' }} onClick={onClose} size={30} />
        </Header>

        <Content>
          <canvas ref={canvas} width={500} height={500} />

          <ColorContainer>
            <Title>Hover image to see the color</Title>

            <ColorBox color={color}>
              <Subtitle style={{ marginBottom: 0, color: 'white', zIndex: 3 }}>{color}</Subtitle>
              <Absolute />
            </ColorBox>
          </ColorContainer>
        </Content>
      </Container>
    </Modal>
  )
}

export default PhotoModalPreview

const Content = styled.div`
  display: flex;
  max-height: 500px;
  height: 100%;
  width: 100%;
  max-width: 1000px;
`

const Absolute = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
`

const ColorBox = styled.div`
  background-color: ${({ color }) => color};
  height: 100px;
  width: fill-available;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border: ${({ theme }) => (theme.name === 'dark' ? `1px solid ${theme.text.primary}` : 'none')};
  position: relative;
`

const Header = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 60px;
`

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 40px;
`

const Container = styled.div`
  height: 100%;
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// HEX FUNCTIONS AND DRAWING
function getElementPosition(obj) {
  let curleft = 0,
    curtop = 0
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft
      curtop += obj.offsetTop
    } while ((obj = obj.offsetParent))
    return { x: curleft, y: curtop }
  }
  return undefined
}

function getEventLocation(element, event) {
  let pos = getElementPosition(element)

  return {
    x: event.pageX - pos.x,
    y: event.pageY - pos.y,
  }
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component')
  return ((r << 16) | (g << 8) | b).toString(16)
}

function drawImageFromWebUrl(sourceurl, canvas) {
  let img = new Image()
  img.crossOrigin = 'Anonymous'

  img.addEventListener('load', function () {
    let scale = Math.min(canvas.width / img.width, canvas.height / img.height)
    // get the top left position of the image
    let x = canvas.width / 2 - (img.width / 2) * scale
    let y = canvas.height / 2 - (img.height / 2) * scale
    // The image can be drawn from any source
    // canvas
    //   .getContext('2d')
    //   .drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    console.log('Draw')
    canvas.getContext('2d').drawImage(img, x, y, img.width * scale, img.height * scale)
  })

  img.setAttribute('src', sourceurl)
}
