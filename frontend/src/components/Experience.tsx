import { OrbitControls, ContactShadows  } from "@react-three/drei";
import { Human } from "./AnimatedHuman"
export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <ContactShadows blur={2}/>
      
      <Human />
      <Human position={[4, 0, 0]} />
    </>
  );
};
