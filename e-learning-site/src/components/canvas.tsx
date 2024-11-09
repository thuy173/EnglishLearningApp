import { useEffect, useRef } from "react";

interface CanvasProps {
  id: string;
  width: number;
  height: number;
  imageSrc: string;
}

const CanvasComponent: React.FC<CanvasProps> = ({
  id,
  width,
  height,
  imageSrc,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) return;

    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, width, height);
      };
    }
  }, [imageSrc, width, height]);

  return (
    <canvas ref={canvasRef} id={id} width={width} height={height}></canvas>
  );
};

export default CanvasComponent;
