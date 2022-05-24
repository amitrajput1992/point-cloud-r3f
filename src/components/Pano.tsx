import { useLoader } from "@react-three/fiber";
import React from "react";
import { ClampToEdgeWrapping, DoubleSide, LinearFilter, MathUtils, TextureLoader, Vector3 } from "three";

const DEFAULT_PANO_Y = -90;
const scaleInvertForCenterCamera = new Vector3(-1, 1, 1);
const url = "https://u.vrgmetri.com/gb-sms-prod-1/media/2021-1/gmetri/eec6cf5a-ba55-4509-9c62-766057e5dde4/o/city_01.jpg";

const Pano = () => {

  const texture = useLoader(TextureLoader, url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;

  return (
    <mesh scale={scaleInvertForCenterCamera} rotation={[0, MathUtils.degToRad(DEFAULT_PANO_Y), 0]} name={"PanoImageR__mesh"}>
      <sphereBufferGeometry attach="geometry" args={[1000, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        opacity={1}
        transparent={false}
      />
    </mesh>
  );
};

export default Pano;