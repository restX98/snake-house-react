import { useRefDimension } from "@/hooks/use-ref-dimension";
import { TILE_SIZE } from "@/lib/constants";

export function useGrid() {
  const [ref, windowSize] = useRefDimension();
  const gridDimension = {
    rows: Math.floor(windowSize.height / TILE_SIZE),
    cols: Math.floor(windowSize.width / TILE_SIZE),
  };

  return { gridRef: ref, gridDimension };
}
