"use client";

import BoxContainer from "@/components/BoxContainer";
import Grid from "@/components/Grid";

import { useSnakeGameContext } from "@/context/snake-game-context";

function SnakeHouse({ className, children }) {
  const { houseRef } = useSnakeGameContext();
  return (
    <div ref={houseRef} className={className}>
      <BoxContainer>{children}</BoxContainer>
      <Grid className="absolute left-0 top-0 size-full max-h-screen max-w-full overflow-hidden" />
    </div>
  );
}

export default SnakeHouse;
