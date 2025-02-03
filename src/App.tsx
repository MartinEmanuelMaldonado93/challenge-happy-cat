import { useRef, useState } from "react";
import { photoUrl } from "./resources";
import "./styles.css";

export default function App() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [currentLabel, setCurrentLabel] = useState<Label | null>(null);
  const startPos = useRef<Position>({
    x: 0,
    y: 0,
  });

  return (
    <div
      className="App"
      onMouseDown={(e) => {
        startPos.current = {
          x: e.clientX,
          y: e.clientY,
        };
        setCurrentLabel({ ...startPos.current, width: 0, height: 0 });
      }}
      onMouseUp={(e) => {
        if (!labels || !currentLabel) return;

        if (isValidLabel()) {
          setLabels((prevLabels) => [...prevLabels, currentLabel]);
        }
        setCurrentLabel(null);

        function isValidLabel() {
          return (
            currentLabel && currentLabel.width > 5 && currentLabel.height > 5
          );
        }
      }}
      onMouseMove={(e) => {
        if (!currentLabel) return;

        const newX = e.clientX;
        const newY = e.clientY;

        setCurrentLabel({
          x: Math.min(startPos.current.x, newX),
          y: Math.min(startPos.current.y, newY),
          width: Math.abs(newX - startPos.current.x),
          height: Math.abs(newY - startPos.current.y),
        });
      }}
    >
      <img
        draggable="false"
        src={photoUrl}
        // to getridoff dragndrop effect
        onDragStart={(e) => e.preventDefault()}
      />
      {currentLabel && (
        <div
          className="label"
          style={{
            left: currentLabel.x - 4 + "px",
            top: currentLabel.y - 4 + "px",
            width: currentLabel.width + "px",
            height: currentLabel.height + "px",
          }}
        ></div>
      )}
      {labels.length > 0 &&
        labels.map((label, i) => (
          <div
            key={String(label.x + label.y + i)}
            className="label"
            style={{
              top: label.y - 4 + "px",
              left: label.x - 4 + "px",
              width: label.width + "px",
              height: label.height + "px",
            }}
          ></div>
        ))}
    </div>
  );
}

// responsive :
/**
 * type Label = { x: number; y: number; width: number; height: number };
type RelativeLabel = {
  xRatio: number;
  yRatio: number;
  widthRatio: number;
  heightRatio: number;
};

export default function App() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [currentLabel, setCurrentLabel] = useState<Label | null>(null);
  const startPos = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [relativeLabels, setRelativeLabels] = useState<RelativeLabel[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRelativeCoordinates = (label: Label, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    return {
      xRatio: (label.x - rect.left) / rect.width,
      yRatio: (label.y - rect.top) / rect.height,
      widthRatio: label.width / rect.width,
      heightRatio: label.height / rect.height,
    };
  };

  // Convertir coordenadas relativas a absolutas
  const getAbsoluteCoordinates = (
    relativeLabel: RelativeLabel,
    container: HTMLElement
  ) => {
    const rect = container.getBoundingClientRect();
    return {
      x: relativeLabel.xRatio * rect.width + rect.left,
      y: relativeLabel.yRatio * rect.height + rect.top,
      width: relativeLabel.widthRatio * rect.width,
      height: relativeLabel.heightRatio * rect.height,
    };
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("resizing...");
      if (containerRef.current) {
        const updatedLabels = relativeLabels.map((relativeLabel) =>
          getAbsoluteCoordinates(relativeLabel, containerRef.current!)
        );
        setLabels(updatedLabels);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [relativeLabels]);
  return (
    <div
      ref={containerRef}
 */
