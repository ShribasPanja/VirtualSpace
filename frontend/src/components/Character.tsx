/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/CUTES/Generic Female.glb -t -o src/components/Character.tsx -r public 
*/

import * as THREE from "three";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { Vector3 } from "three";

const MOVE_SPEED = 0.1;
const ROTATION_SPEED = 0.1;
const ANIMATION_TRANSITION_DURATION = 0.2;

type ActionName =
  | "Armature|Grounded"
  | "Armature|Idle"
  | "Armature|Jump"
  | "Armature|Sprint"
  | "Armature|Walk";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.SkinnedMesh;
    Cube003: THREE.SkinnedMesh;
    CORE: THREE.Bone;
  };
  materials: {
    GenericFemale: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function GenericFemale({
  position,
  id,
  ...props
}: {
  position?: Vector3;
  id: string;
} & Omit<React.ComponentProps<"group">, "id">) {
  const positionMemo = useMemo(() => position || new Vector3(0, 0, 0), []);
  const group = useRef<THREE.Group>(null);
  const targetPosition = useRef(new Vector3());
  const { scene, animations } = useGLTF("/models/CUTES/Generic Female.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [currentAnimation, setCurrentAnimation] =
    useState<ActionName>("Armature|Idle");
  const previousAnimation = useRef<ActionName>("Armature|Idle");

  useEffect(() => {
    if (position) {
      targetPosition.current.copy(position);
    }
  }, [position]);

  useEffect(() => {
    // Fade out previous animation
    if (previousAnimation.current) {
      actions[previousAnimation.current]?.fadeOut(
        ANIMATION_TRANSITION_DURATION
      );
    }
    // Fade in new animation
    actions[currentAnimation]
      ?.reset()
      .fadeIn(ANIMATION_TRANSITION_DURATION)
      .play();
    previousAnimation.current = currentAnimation;

    return () => {
      actions[currentAnimation]?.fadeOut(ANIMATION_TRANSITION_DURATION);
    };
  }, [actions, currentAnimation]);

  useFrame(() => {
    if (group.current?.position && position) {
      const distance = group.current.position.distanceTo(
        targetPosition.current
      );

      if (distance > 0.1) {
        // Calculate direction to target
        const direction = targetPosition.current
          .clone()
          .sub(group.current.position)
          .normalize();

        // Smoothly move towards target
        group.current.position.add(direction.multiplyScalar(MOVE_SPEED));

        // Smoothly rotate towards target
        const targetRotation = Math.atan2(direction.x, direction.z);
        const currentRotation = group.current.rotation.y;
        const rotationDiff = targetRotation - currentRotation;

        // Normalize rotation difference to [-PI, PI]
        const normalizedDiff =
          ((rotationDiff + Math.PI) % (2 * Math.PI)) - Math.PI;
        group.current.rotation.y += normalizedDiff * ROTATION_SPEED;

        setCurrentAnimation("Armature|Walk");
      } else {
        setCurrentAnimation("Armature|Idle");
      }
    }
  });

  return (
    <group ref={group} dispose={null} position={positionMemo}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.CORE} />
          </group>
          <skinnedMesh
            name="Cube001"
            geometry={nodes.Cube001.geometry}
            material={materials.GenericFemale}
            skeleton={nodes.Cube001.skeleton}
            position={[0, 1.423, 0.59]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[56, 56, 49.946]}
          />
          <skinnedMesh
            name="Cube003"
            geometry={nodes.Cube003.geometry}
            material={materials.GenericFemale}
            skeleton={nodes.Cube003.skeleton}
            position={[0, 0.692, 0.068]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={56}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/CUTES/Generic Female.glb");
