import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { RecoilRoot } from "recoil";
import { SocketManager } from "./components/Socket";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <>
        <SocketManager />
        <Canvas shadows camera={{ position: [10, 10, 40], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
      </>
    </RecoilRoot>
  );
}

export default App;
