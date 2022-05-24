import React, { Suspense } from "react";
import Div100 from "react-div-100vh";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { ResizeObserver } from "@juggle/resize-observer";
import PointCloud from "./components/PointCloud";
import Pano from "./components/Pano";
import { OrbitControls } from "@react-three/drei";

const orbitControllerArgs = {
enableDamping: true,
enablePan: true,
enableRotate: true,
enableZoom: true,
reverseOrbit: false,
}

const App = () => {
  return (
  <Div100>
    <Canvas
      resize={{ polyfill: ResizeObserver }}
      // overriding onCreated here so that the default vr/ar buttons are not added.
      // https://github.com/pmndrs/react-xr/blob/f3b96d520f8cbe4c19f3670f7b351bfeb8e6ac14/src/XR.tsx#L131
      onCreated={() => {}}
      style={{
        backgroundColor: "#333"
      }}
      color="#000000" //default black background for canvas
      // pass the props that will get applied to the default camera setup. In our case, this works best as it avoid un-necessary re-renders on camera change.
      camera={{
        fov: 75,
        near: 0.01,
        far: 1500,
        position: [0, 0, 1],
      }}
      dpr={window.devicePixelRatio}
      //toggle sRGB color management.
      linear={true}
    >
      <OrbitControls {...orbitControllerArgs}/>
      <Suspense fallback={null}>
        <PointCloud />
        {/* <Pano /> */}
      </Suspense>
    </Canvas>
  </Div100>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
