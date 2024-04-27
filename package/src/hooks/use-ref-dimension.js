import { useState, useEffect, useRef } from "react";

// Copied from https://stackoverflow.com/a/73248253/23174355
export function useRefDimension() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const observedDiv = useRef(null);

  useEffect(() => {
    if (!observedDiv.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setDimensions({
        width: observedDiv.current.offsetWidth,
        height: observedDiv.current.offsetHeight,
      });
    });

    resizeObserver.observe(observedDiv.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [observedDiv.current?.offsetWidth, observedDiv.current?.offsetHeight]);

  return [observedDiv, dimensions];
}
