import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import samplePDF from '../assets/sample.pdf';

import useAnnotation from '../hooks/useAnnotation';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const maxWidth = 800;

interface PDFLoaderProps {
  containerWidth?: number;
}

function PDFLoader({ containerWidth }: PDFLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canDraw, setCanDraw] = useState<boolean>(false);

  const { onMouseDown, onMouseMove, onMouseUp, clearCanvas, outline } =
    useAnnotation({
      canvasRef,
      canDraw,
      setCanDraw,
    });

  const handleDrawing = () => {
    clearCanvas();
    setCanDraw((prev) => !prev);
  };

  console.log({ outline });

  return (
    <>
      <button
        className="bg-yellow-500 p-2 rounded-md mb-10"
        onClick={handleDrawing}
      >
        {canDraw ? 'Stop' : 'Start'} Drawing
      </button>
      <Document file={samplePDF} renderMode="canvas">
        <Page
          canvasRef={canvasRef}
          onRenderSuccess={() => setCanDraw(true)}
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </Document>
    </>
  );
}

export default PDFLoader;
