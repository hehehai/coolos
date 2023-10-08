"use client"

import {
  ElementRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
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
import toast from "react-hot-toast"

import { cn, generateCombinedId } from "@/lib/utils"
import { useFullScreen } from "@/hooks/useFullScreen"
import { Color, getTransitionColors } from "@/components/shared/color-picker"

import PaletteBlock from "./_components/PaletteBlock"
import { SortableItem } from "./_components/SortableItem"
import Toolbar from "./_components/Toolbar"
import { IPaletteBlock, usePaletteStore } from "./_store/palette"
import { useSettingStore } from "./_store/setting"

const ColorPalette = () => {
  // 获取路由的参数
  // 色板块颜色参数
  const id = useId()

  const setting = useSettingStore((state) => state)

  const [activeId, setActiveId] = useState<string | number | null>(null)
  const store = usePaletteStore((state) => state)
  const paletteIds = useMemo(() => {
    return store.palette.map((item) => item.id)
  }, [store.palette])
  const activeBlock = useMemo(() => {
    return store.palette.find((item) => item.id === activeId)
  }, [activeId, store.palette])
  const paletteRef = useRef<ElementRef<"div">>(null)
  const fullMethod = useFullScreen(paletteRef)

  const handleChange = (id: string, color: Color) => {
    const newPalette = [...store.palette]
    const idx = newPalette.findIndex((item) => item.id === id)
    newPalette[idx].color = color
    store.setPalette(newPalette)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleAdd = useCallback(
    (before: IPaletteBlock, after: IPaletteBlock) => {
      if (store.palette.length >= 12) {
        toast.error("palette can't be more than 12")
        return
      }

      const newPalette = [...store.palette]
      const newBlock: IPaletteBlock = {
        id: generateCombinedId(),
        color: getTransitionColors(before.color, after.color, 3)[1],
      }
      const idx = newPalette.findIndex((item) => item.id === before.id)
      newPalette.splice(idx + 1, 0, newBlock)
      store.setPalette(newPalette)
    },
    [store.palette]
  )

  const handleRemove = useCallback(
    (id: string) => {
      if (store.palette.length === 2) {
        toast.error("palette can't be less than 2")
        return
      }
      const newPalette = [...store.palette]
      const idx = newPalette.findIndex((item) => item.id === id)
      newPalette.splice(idx, 1)
      store.setPalette(newPalette)
    },
    [store.palette]
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event

    if (active.id) setActiveId(active.id)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null)
      const { active, over } = event

      if (active.id !== over?.id) {
        const oldIndex = store.palette.findIndex(
          (item) => item.id === active.id
        )
        const newIndex = store.palette.findIndex((item) => item.id === over?.id)

        const nextPalette = arrayMove(store.palette, oldIndex, newIndex)
        store.setPalette(nextPalette)
      }
    },
    [store.palette]
  )

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <Toolbar onZen={() => fullMethod.enter()} />
      <div className="w-full grow">
        <div
          ref={paletteRef}
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
              {store.palette.map((block, idx) => {
                return (
                  <SortableItem
                    id={block.id}
                    key={block.id}
                    handle
                    className="h-full"
                    style={{
                      flexGrow: 1,
                      width: `${100 / store.palette.length}%`,
                    }}
                  >
                    {(handleProps) => (
                      <PaletteBlock
                        block={block}
                        onChange={(c) => handleChange(block.id, c)}
                        showLeft={idx !== 0}
                        showRight={idx !== store.palette.length - 1}
                        handleProps={handleProps}
                        onRemove={() => handleRemove(block.id)}
                        onAddBefore={() =>
                          handleAdd(store.palette[idx - 1], block)
                        }
                        onAddAfter={() =>
                          handleAdd(block, store.palette[idx + 1])
                        }
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
