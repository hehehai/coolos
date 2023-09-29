"use client"

import React from "react"
import { DraggableAttributes } from "@dnd-kit/core"
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export interface SortableItemProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  id: string
  handle: boolean
  children: (handleProps: {
    attributes: DraggableAttributes
    listeners?: SyntheticListenerMap
  }) => React.ReactNode
}

export function SortableItem({
  children,
  style,
  id,
  className,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const mergeStyle = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.1 : 1,
  }

  return (
    <div ref={setNodeRef} style={mergeStyle} className={className}>
      {children({ attributes, listeners })}
    </div>
  )
}
