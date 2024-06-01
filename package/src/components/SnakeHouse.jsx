"use client";

import BoxContainer from "@/components/BoxContainer";
import Grid from "@/components/Grid";

import { useSnakeGameContext } from "@/context/snake-game-context";
import { cn } from "@/lib/utils";

function SnakeHouse({ className, children }) {
  const { houseRef } = useSnakeGameContext();
  return (
    <div ref={houseRef} className="relative size-full">
      <BoxContainer className={cn(className, "absolute inset-0 size-full")}>
        {children}
      </BoxContainer>
      <Grid className="absolute inset-0 size-full bg-zinc-800" />
    </div>
  );
}

export default SnakeHouse;
