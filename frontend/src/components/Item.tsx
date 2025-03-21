import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";

const GRID_UNIT = 2; // Size of each grid unit in world space

export const Item = ({
  item,
}: {
  item: { name: string; size: number[]; gridPosition: number[] };
}) => {
  const { name, gridPosition, size } = item;

  // Error handling for required properties
  if (!name || !gridPosition || !size) {
    console.error("Missing required item properties:", item);
    return null;
  }

  const { scene } = useGLTF(`/models/items/${name}.glb`);

  // Convert grid position to world position
  const position = useMemo(() => {
    return new Vector3(
      gridPosition[0] * GRID_UNIT,
      0, // Y position (height)
      gridPosition[1] * GRID_UNIT
    );
  }, [gridPosition]);

  // Clone and modify the scene
  const model = useMemo(() => {
    if (!scene) {
      console.error(`Failed to load model for item: ${name}`);
      return null;
    }
    const clonedScene = scene.clone();
    // Scale based on item size
    clonedScene.scale.set(
      size[0] * GRID_UNIT * 0.5,
      1, // Keep original height
      size[1] * GRID_UNIT * 0.5
    );
    return clonedScene;
  }, [scene, size, name]);

  if (!model) {
    return null;
  }

  return <primitive object={model} position={position} />;
};
