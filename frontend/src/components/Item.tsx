import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";
import { mapState } from "../store/Atoms";
import { useRecoilValue } from "recoil";
import { SkeletonUtils } from "three-stdlib";
export const Item = ({
  item,
}: {
  item: { name: string; size: number[]; gridPosition: number[]; rotation: number };
}) => {
  const map = useRecoilValue(mapState);
  const { name, gridPosition, size, rotation } = item;

  // Error handling for required properties
  if (!name || !gridPosition || !size) {
    console.error("Missing required item properties:", item);
    return null;
  }

  const { scene } = useGLTF(`/models/items/${name}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  console.log(rotation);
  return (
    <primitive
      object={clone}
      position={[
        size[0] / map.subdivisions / 2 + gridPosition[0] / map.subdivisions,
        0,
        size[1] / map.subdivisions / 2 + gridPosition[1] / map.subdivisions,
      ]}
      rotation-y={((rotation || 0) * Math.PI) / 2}
    />
  );
};
