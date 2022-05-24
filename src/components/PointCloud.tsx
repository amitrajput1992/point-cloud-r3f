import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import { Points, Box3, Vector3, Vector2, Raycaster } from "three";
import { pointCloudOptions } from "./pointCloudOptions";

function getScale(points: Points) {
  const box = new Box3().setFromObject(points);
  const sizeVector = new Vector3();
  box.getSize(sizeVector);
  const maxAxis = Math.max(sizeVector.x, sizeVector.y, sizeVector.z);
  const relativeScale = (3.0 / maxAxis);
  return relativeScale;
}

//https://s.vrgmetri.com/gm-gb-test/pcd_models/am_office1.pcd
const PointCloud = () => {
  const { size, model } = useControls({
    size: 0.01,
    model: {
      value: "home.pcd",
      options: pointCloudOptions,
    }
  });

  const scene = useThree(s => s.scene);
  const camera = useThree(s => s.camera);

  useEffect(() => {
    const points = scene.getObjectByName( model );
    if(points instanceof Points) {
      points.material.size = size;
    }
  }, [size, model]);


  // const result = useLoader(PCDLoader, url);
  const result = useLoader(PCDLoader, `https://s.vrgmetri.com/gm-gb-test/pcd_models/${model}`);

  useEffect(() => {
    result.geometry.center();

    const scale = getScale(result);
    console.log(result);
    // result.geometry.rotateX(Math.PI);
    result.scale.set(scale, scale, scale);
    // @ts-ignore
    result.material.color.setHex( 0xffffff );
  }, [result]);



  function getIntersections(event: MouseEvent) {
    const vector = new Vector2();

    vector.set(
      event.clientX / window.innerWidth * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new Raycaster();
    raycaster.setFromCamera(vector, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    return intersects;
  }


  function onMouseDown(e: MouseEvent) {
    const intersections = getIntersections(e);

    if(intersections.length > 0) {
      
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);

    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    // @ts-ignore
    <primitive object={result} />
  );
};

export default PointCloud;