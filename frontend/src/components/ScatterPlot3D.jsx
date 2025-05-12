import React from "react";
import { Canvas } from "@react-three/fiber";

const ScatterPlot3D = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Use three numerical columns for coordinates
  const xKey = "sepal_length";
  const yKey = "sepal_width";
  const zKey = "petal_length";
  const colorKey = "class"; // for coloring

  // Assign colors to categories
  const classColors = {};
  let colorIdx = 0;
  const palette = ["red", "green", "blue", "orange", "purple"];
  data.forEach((row) => {
    if (!classColors[row[colorKey]]) {
      classColors[row[colorKey]] = palette[colorIdx % palette.length];
      colorIdx++;
    }
  });

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {data.slice(0, 100).map((point, idx) => (
          <mesh
            key={idx}
            position={[
              Number(point[xKey]),
              Number(point[yKey]),
              Number(point[zKey]),
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={classColors[point[colorKey]] || "gray"}
              opacity={0.8}
              transparent
            />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default ScatterPlot3D;
