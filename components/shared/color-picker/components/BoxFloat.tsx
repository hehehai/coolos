'use client'

import { cn } from "@/lib/utils";
import { forwardRef, useMemo, useRef } from "react";
import { TransformOffset } from "@/components/shared/color-picker/interface";
import useColorDrag, { CalculateEvent, DragChangeEvent } from "@/components/shared/color-picker/hooks/useColorDrag";
import { Color } from "@/components/shared/color-picker";

// box [track [transform [float]], interlayer]

export interface BoxFloatProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  // 初始位置
  initOffset?: TransformOffset;
  // 移动方向 (目前不支持 y)
  direction?: 'x' | 'y' | 'xy';
  // 位置计算器
  offsetCalculate?: (event: CalculateEvent, refColor?: Color) => TransformOffset | undefined;
  // 位置变化回调
  onChange?: (offset: TransformOffset, event: DragChangeEvent) => void;
  // 是否在内部拖动
  inside?: boolean;
  // 是否禁用
  disabled?: boolean;

  // 拖动元素
  float?: JSX.Element;
  // 点位层
  layerPoints?: Color[];
  layerPointClassName?: string;
  // 渐变层
  layerGradientClassName?: string;
  layerGradientStyle?: React.CSSProperties;
}

const BoxFloat = forwardRef<HTMLDivElement, BoxFloatProps>(({
  initOffset,
  direction = 'xy',
  offsetCalculate,
  onChange,
  inside = false,
  disabled = false,
  className,

  float,
  layerPoints,
  layerPointClassName,
  layerGradientClassName,
  layerGradientStyle,

  ...rest
}, ref) => {

  const trackRef = useRef<HTMLDivElement>(null)
  const transformRef = useRef<HTMLDivElement>(null)

  const [offset, handleDragStart, { getBaseData }] = useColorDrag({
    initOffset,
    inside,
    trackRef,
    transformRef,
    direction,
    disabled,
    offsetCalculate,
    onDragChange: onChange,
  })

  const pointsLayer = useMemo(() => {
    if (!layerPoints || !offsetCalculate) return null
    return layerPoints.map((color, idx: number) => {
      const baseData = getBaseData({ width: 6, height: 6 })
      if (!baseData) return null
      if ((baseData.transformWidth === 0 && baseData.transformHeight === 0)) return
      const pointOffset = offsetCalculate(baseData, color)
      if (!pointOffset) return null
      return <div key={idx}
        className={cn('absolute w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.075)]', layerPointClassName)}
        style={{
          zIndex: idx + 1,
          left: pointOffset.x,
          top: pointOffset.y,
        }}
      />
    })
  }, [layerPointClassName, layerPoints, offsetCalculate, getBaseData])

  const middleLayer = useMemo(() => {
    return <div
      className={cn('absolute z-[1] inset-0', layerGradientClassName)}
      style={layerGradientStyle}
    >
      {pointsLayer}
    </div>
  }, [layerGradientClassName, layerGradientStyle, pointsLayer])

  return <div ref={ref} className={cn('relative', className)} {...rest}>
    <div
      ref={trackRef}
      className={cn('relative', 'z-[3]', 'w-full', 'h-full')}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div ref={transformRef} className={cn('absolute', 'z-1')} style={{
        left: offset.x,
        top: offset.y,
      }}>
        {float}
      </div>
    </div>
    {middleLayer}
  </div>
})

BoxFloat.displayName = 'BoxFloat'

export default BoxFloat
