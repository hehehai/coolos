import { cn } from "@/lib/utils"
import { contrastStatus } from "@/components/shared/color-picker"
import ScoreStart from "@/components/shared/ScoreStart"

interface ContrastDetailProps {
  contrast: contrastStatus
}

const ContrastDetail = ({ contrast }: ContrastDetailProps) => {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      <div
        className={cn(
          "col-span-2 flex items-center justify-between rounded-t-lg bg-red-100 px-8 py-6",
          contrast.score.color,
          contrast.score.bg
        )}
      >
        <div className="text-5xl font-bold">{contrast.contrast.toFixed(2)}</div>
        <div className="text-center">
          <div className="mb-1">{contrast.score.label}</div>
          <ScoreStart
            score={contrast.score.level.length}
            className={contrast.score.color}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex items-center justify-between rounded-bl-lg bg-red-100 px-5 py-3",
          contrast.score.color,
          contrast.score.bg
        )}
      >
        <div>Small text</div>
        <div>{contrast.level.small ? "Passed" : "Fialed"}</div>
      </div>
      <div
        className={cn(
          "flex items-center justify-between rounded-br-lg bg-red-100 px-5 py-3",
          contrast.level.big
            ? "bg-green-200 text-green-600"
            : "text-vilet-700 bg-red-200"
        )}
      >
        <div>Large text</div>
        <div>{contrast.level.big ? "Passed" : "Fialed"}</div>
      </div>
    </div>
  )
}

ContrastDetail.displayName = "ContrastDetail"

export default ContrastDetail
