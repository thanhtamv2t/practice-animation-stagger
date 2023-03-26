import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import random from 'lodash/random'

interface ITileEffect {
  size?: number
}

const colors = [
  '#EF476F',
  '#FFD166',
  '#06D6A0',
  '#118AB2',
  '#073B4C'
]

const TileEffect: React.FC<ITileEffect> = ({ size = 50 }) => {
  const [state, setState] = useState({
    cols: 0,
    rows: 0
  })

  const count = useRef(0)
  const mRef = useRef<boolean>(false)

  const tileCount = state.cols * state.rows

  const generateTile = (isAnimate?: boolean): any => {
    const cols = Math.floor(document.body.clientWidth / size)
    const rows = Math.floor(document.body.clientHeight / size)

    document.body.style.setProperty('--columns', cols.toString())
    document.body.style.setProperty('--rows', rows.toString())
    setState({
      cols, rows
    })
  }

  const onAnimate = (): any => {
    anime({
      targets: '.tile',
      backgroundColor: colors[count.current % colors.length],
      delay: anime.stagger(50, {
        grid: [state.cols, state.rows],
        from: random(0, tileCount)
      }),
      complete: () => {
        console.log('complete')
        count.current += 1
        onAnimate()
      }
    })
  }

  const onHover = (): any => {
    if (!mRef.current) {
      mRef.current = true
      return onAnimate()
    }
  }

  useEffect(() => {
    generateTile(true)
    window.addEventListener('resize', () => generateTile())
  }, [])

  return (
    <div className='tiles'>
        {Array(tileCount).fill(1).map((_tile, _index) => {
          return <div className='tile' key={_index} onMouseOver={onHover}></div>
        })}
    </div>
  )
}

export default TileEffect
