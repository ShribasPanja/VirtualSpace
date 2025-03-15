import { useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber' 
import { Experience } from './components/Experience'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas shadows camera={{ position: [10, 10, 20], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  )
}

export default App
