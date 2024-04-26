'use client'

import Tile from './Tile'
import { useSnakeGameContext } from '@/context/snake-game-context'
import { cn } from '@/lib/utils'

function Grid({ className }) {
  const { houseRef, gridDimension } = useSnakeGameContext()
  const _cols = Array.from({ length: gridDimension.cols }, (_, index) => index)
  const _rows = Array.from({ length: gridDimension.rows }, (_, index) => index)

  return (
    <div ref={houseRef} className={cn(className, 'flex flex-col justify-evenly')}>
      {_rows.map((row) => (
        <div key={row} className="flex w-screen justify-evenly">
          {_cols.map((col) => (
            <Tile key={`${col}-${row}`} coords={{ col, row }} />
          ))}
        </div>),
      )}
    </div>
  )
}

export default Grid
