import { useEffect } from 'react';

interface UseAnnotationProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canDraw: boolean;
  setCanDraw: React.Dispatch<React.SetStateAction<boolean>>;
}

let drawing = false;
let start: { x: number; y: number } = { x: 0, y: 0 };
let outline: { x: number; y: number; width: number; height: number } = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
let imageData: ImageData;

function useAnnotation({ canvasRef, canDraw, setCanDraw }: UseAnnotationProps) {
  const ctx = canvasRef.current?.getContext('2d');

  useEffect(() => {
    if (canvasRef.current && ctx) {
      const { width, height } = canvasRef.current;
      imageData = ctx.getImageData(0, 0, width, height);
    }
  }, [canvasRef, ctx]);

  const getMousePosition = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { width, height } = canvasRef.current;

      return {
        x: ((e.clientX - rect.left) * width) / rect.width,
        y: ((e.clientY - rect.top) * height) / rect.height,
      };
    }
  };

  function clearCanvas() {
    if (ctx && canvasRef.current && imageData) {
      const { width, height } = canvasRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(imageData, 0, 0);
    }
  }

  function draw() {
    if (ctx) {
      clearCanvas();

      ctx.beginPath();
      ctx.rect(outline.x, outline.y, outline.width, outline.height);
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }
  }

  const onMouseDown = (e: MouseEvent) => {
    drawing = true;
    start = getMousePosition(e)!;
  };

  function onMouseMove(e: MouseEvent) {
    if (ctx && canDraw && drawing) {
      draw();
      const { x, y } = getMousePosition(e)!;
      ctx.beginPath();
      ctx.rect(start.x, start.y, x - start.x, y - start.y);
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
  }

  function onMouseUp(e: MouseEvent) {
    if (canDraw) {
      const { x, y } = getMousePosition(e)!;
      outline = {
        x: start.x,
        y: start.y,
        width: x - start.x,
        height: y - start.y,
      };

      draw();

      start = { x: 0, y: 0 };
      drawing = false;
      setCanDraw(false);
    }
  }

  return { onMouseDown, onMouseUp, onMouseMove, clearCanvas, outline };
}

export default useAnnotation;
