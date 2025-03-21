import {
  OrbitControls,
  ContactShadows,
  Environment,
  useCursor,
} from "@react-three/drei";
import { GenericFemale } from "./Character";
import { useRecoilValue } from "recoil";
import { usersState, mapState } from "../store/Atoms";
import { useState } from "react";
import { socket } from "./Socket";
import { Vector3 } from "three";
import { Item } from "./Item";

export const Experience = () => {
  const users = useRecoilValue(usersState);
  const map = useRecoilValue(mapState);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  console.log("Map data:", map); // Debug log

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={3} />
      <Environment preset="sunset" />
      <directionalLight position={[10, 10, 5]} castShadow />

      {/* Render items */}
      {map?.items?.map((item, idx) => (
        <Item key={`${item.name}-${idx}`} item={item} />
      ))}

      {/* Floor */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        receiveShadow
        onClick={(e) => {
          socket.emit("move", [e.point.x, e.point.y, e.point.z]);
        }}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="grey" />
      </mesh>

      <ContactShadows blur={2} opacity={0.5} />

      {/* Render users */}
      {users.map((user) => (
        <GenericFemale
          key={user.id}
          position={
            new Vector3(user.position[0], user.position[1], user.position[2])
          }
        />
      ))}
    </>
  );
};
