import { cn } from "@/lib/utils";
import { FC } from "react"
import { IconStarFill } from "../icons";

const ScoreStart: FC<{
  score?: number;
  max?: number;
  className?: string;
}> = ({
  score = 0,
  max = 5,
  className
}) => {
    return <div className={cn('flex items-center space-x-1 text-xl', className)}>
      {Array.from({ length: max }).map((_, idx) => {
        return <div key={idx} className={cn(idx + 1 <= score ? 'opacity-100' : 'opacity-50')}>
          <IconStarFill />
        </div>
      })}
    </div>
  }

ScoreStart.displayName = 'ScoreStart'

export default ScoreStart
