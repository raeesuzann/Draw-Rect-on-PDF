import { useCallback, useState } from 'react';

import { useResizeObserver } from '@wojtekmaj/react-hooks';
import PDFLoader from './pdf-loader';

function App() {
  const [containerWidth, setContainerWidth] = useState<number>();

  const [outerContainer, setOuterContainer] = useState<HTMLElement | null>(
    null
  );

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(outerContainer, {}, onResize);

  return (
    <div id="app" className="w-screen h-screen">
      <div id="pdf-loader" ref={setOuterContainer}>
        <PDFLoader containerWidth={containerWidth} />
      </div>
    </div>
  );
}

export default App;
