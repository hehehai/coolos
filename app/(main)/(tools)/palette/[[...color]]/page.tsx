"use client"

import { useId, useMemo, useState } from "react"
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { cn, generateCombinedId } from "@/lib/utils"
import { Color, generateColor } from "@/components/shared/color-picker"

import PaletteBlock from "./_components/PaletteBlock"
import { SortableItem } from "./_components/SortableItem"
import Toolbar from "./_components/Toolbar"
import { usePaletteStore } from "./_store/palette"

interface IPaletteBlock {
  id: string
  color: Color
}

const baseColor = [
  {
    id: generateCombinedId(),
    color: generateColor("#2DE1C2"),
  },
  {
    id: generateCombinedId(),
    color: generateColor("#6AD5CB"),
  },
  {
    id: generateCombinedId(),
    color: generateColor("#7FBEAB"),
  },
  {
    id: generateCombinedId(),
    color: generateColor("#7E998A"),
  },
  {
    id: generateCombinedId(),
    color: generateColor("#85877C"),
  },
]

const ColorPalette = () => {
  // 获取路由的参数
  // 色板块颜色参数
  const id = useId()

  const setting = usePaletteStore((state) => state.setting)

  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [palette, setPalette] = useState<IPaletteBlock[]>(baseColor)
  const paletteIds = useMemo(() => {
    return palette.map((item) => item.id)
  }, [palette])
  const activeBlock = useMemo(() => {
    return palette.find((item) => item.id === activeId)
  }, [activeId])

  const handleChange = (id: string, color: Color) => {
    const newPalette = [...palette]
    const idx = newPalette.findIndex((item) => item.id === id)
    newPalette[idx].color = color
    setPalette(newPalette)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    if (active.id) setActiveId(active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event

    if (active.id !== over?.id) {
      setPalette((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <Toolbar />
      <div className="w-full grow">
        <div
          className={cn(
            "flex h-full w-full items-stretch justify-between",
            setting.isIsolated && "gap-x-4 p-4"
          )}
        >
          <DndContext
            id={id}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToHorizontalAxis]}
          >
            <SortableContext
              items={paletteIds}
              strategy={verticalListSortingStrategy}
            >
              {palette.map((block, idx) => {
                return (
                  <SortableItem
                    id={block.id}
                    key={block.id}
                    handle
                    className="h-full"
                    style={{ flexGrow: 1, width: `${100 / palette.length}%` }}
                  >
                    {(handleProps) => (
                      <PaletteBlock
                        block={block}
                        onChange={(c) => handleChange(block.id, c)}
                        showLeft={idx !== 0}
                        showRight={idx !== palette.length - 1}
                        handleProps={handleProps}
                      />
                    )}
                  </SortableItem>
                )
              })}
            </SortableContext>
            <DragOverlay modifiers={[restrictToWindowEdges]}>
              {activeId && activeBlock ? (
                <PaletteBlock block={activeBlock} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default ColorPalette
