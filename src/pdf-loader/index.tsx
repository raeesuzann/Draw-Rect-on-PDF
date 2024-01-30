import { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

type PDFFile = string | File | null;

function PDFLoader() {
  const [file, setFile] = useState<PDFFile>('sample.pdf');

  return <div>PDFLoader</div>;
}

export default PDFLoader;
