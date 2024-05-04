import { useState, useEffect } from "react";
import { useRefDimension } from "@/hooks/use-ref-dimension";
import { TILE_SIZE } from "@/lib/constants";

export function useGrid(initGrid) {
  const [gridDimension, setGridDimension] = useState(
    initGrid ? initGrid : { cols: 0, rows: 0 },
  );

  const [ref, windowSize] = useRefDimension();

  useEffect(() => {
    setGridDimension(() => ({
      rows: Math.floor(windowSize.height / TILE_SIZE),
      cols: Math.floor(windowSize.width / TILE_SIZE),
    }));
  }, [windowSize.width, windowSize.height]);

  return { gridRef: ref, gridDimension };
}
