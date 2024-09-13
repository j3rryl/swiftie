import * as THREE from "three";
import { forwardRef, useLayoutEffect, useRef, useMemo } from "react";
import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import { useLoader } from "@react-three/fiber";
extend({ TextGeometry });

const Text = forwardRef(
  (
    {
      children,
      vAlign = "center",
      hAlign = "center",
      size = 1,
      color = "#000000",
      ...props
    },
    ref
  ) => {
    // const font = useLoader(THREE.FontLoader, "/bold.blob");
    const config = useMemo(() => ({ size: 40, height: 50 }));
    const mesh = useRef();
    useLayoutEffect(() => {
      const size = new THREE.Vector3();
      mesh.current.geometry.computeBoundingBox();
      mesh.current.geometry.boundingBox.getSize(size);
      mesh.current.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      mesh.current.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    }, [children]);
    return (
      <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
        <mesh ref={mesh}>
          <textGeometry args={[children, config]} />
          <meshNormalMaterial />
        </mesh>
      </group>
    );
  }
);

export default Text;
