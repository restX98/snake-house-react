import { useRefDimension } from "@/hooks/use-ref-dimension";

export function useGrid(tileSize) {
  const [ref, windowSize] = useRefDimension();
  const gridDimension = {
    rows: Math.floor(windowSize.height / tileSize),
    cols: Math.floor(windowSize.width / tileSize),
  };

  return { gridRef: ref, gridDimension };
}
