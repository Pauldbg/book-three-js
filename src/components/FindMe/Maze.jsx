
import React from 'react'
import { Box } from '@react-three/drei'
import Wall from './Wall'
import { GAME_CONFIG } from '../../configMaze'

export default function Maze({ maze, objectPosition }) {
  return (
    <>
      {maze.map((row, z) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <Wall 
              key={`${x}-${z}`} 
              position={[
                x * GAME_CONFIG.PATH_WIDTH + GAME_CONFIG.PATH_WIDTH / 2, 
                GAME_CONFIG.WALL_HEIGHT / 2, 
                z * GAME_CONFIG.PATH_WIDTH + GAME_CONFIG.PATH_WIDTH / 2
              ]} 
              scale={[GAME_CONFIG.PATH_WIDTH, GAME_CONFIG.WALL_HEIGHT, GAME_CONFIG.PATH_WIDTH]}
            />
          ) : null
        )
      )}
      <Box 
        position={[
          objectPosition.x * GAME_CONFIG.PATH_WIDTH + GAME_CONFIG.PATH_WIDTH / 2, 
          0.5, 
          objectPosition.z * GAME_CONFIG.PATH_WIDTH + GAME_CONFIG.PATH_WIDTH / 2
        ]} 
        args={[GAME_CONFIG.PATH_WIDTH / 2, 0.5, GAME_CONFIG.PATH_WIDTH / 2]}
      >
        <meshStandardMaterial color={GAME_CONFIG.COLORS.OBJECT} />
      </Box>
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[
          GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH / 2, 
          0, 
          GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH / 2
        ]}
      >
        <planeGeometry args={[GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH, GAME_CONFIG.MAZE_SIZE * GAME_CONFIG.PATH_WIDTH]} />
        <meshStandardMaterial color={GAME_CONFIG.COLORS.GROUND} />
      </mesh>
    </>
  )
}