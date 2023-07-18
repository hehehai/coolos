import {TransformOffset} from "@/components/shared/color-picker/interface";
import {useCallback, useEffect, useRef, useState} from "react";

type EventType =
    | MouseEvent
    | React.MouseEvent<Element, MouseEvent>
    | React.TouchEvent<Element>
    | TouchEvent;

export interface DragChangeEvent {
    trackRef: React.RefObject<HTMLDivElement>;
    transformRef: React.RefObject<HTMLDivElement>;
    trackX: number;
    trackY: number;
    trackWidth: number;
    trackHeight: number;
    transformWidth: number;
    transformHeight: number;
    centerOffsetX: number;
    centerOffsetY: number;
    sideWidth: number;
    sideHeight: number;
    offsetX: number;
    offsetY: number;
}

export interface CalculateEvent {
    trackRef: React.RefObject<HTMLDivElement>;
    transformRef: React.RefObject<HTMLDivElement>;
    trackX: number;
    trackY: number;
    trackWidth: number;
    trackHeight: number;
    transformWidth: number;
    transformHeight: number;
    centerOffsetX: number;
    centerOffsetY: number;
    offsetX: number;
    offsetY: number;
}

export interface DragOptions {
    initOffset?: TransformOffset;
    offsetCalculate?: (event: CalculateEvent) => TransformOffset | undefined;
    direction?: 'x' | 'y' | 'xy';
    trackRef: React.RefObject<HTMLDivElement>;
    transformRef: React.RefObject<HTMLDivElement>;
    onDragChange?: (offset: TransformOffset, event: DragChangeEvent) => void;
    onDragChangeComplete?: () => void;
    inside?: boolean;
    disabled?: boolean;
}

type EventHandle = (e: EventType) => void;

function getPosition(e: EventType) {
    const obj = 'touches' in e ? e.touches[0] : e;
    const scrollXOffset =
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        window.pageXOffset;
    const scrollYOffset =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
    return {pageX: obj.pageX - scrollXOffset, pageY: obj.pageY - scrollYOffset};
}


function useColorDrag({
                          initOffset,
                          offsetCalculate,
                          direction = 'xy',
                          trackRef,
                          transformRef,
                          onDragChange,
                          onDragChangeComplete,
                          inside,
                          disabled
                      }: DragOptions) {

    const [offset, setOffset] = useState<TransformOffset>(initOffset ?? {x: 0, y: 0})
    const dragMoveRef = useRef<((event: MouseEvent | TouchEvent) => void) | null>(null)
    const dragUpRef = useRef<((event: MouseEvent | TouchEvent) => void) | null>(null)
    const dragRef = useRef({
        flag: false
    })

    const unBindEvent = () => {
        if (dragMoveRef.current) {
            document.removeEventListener('mousemove', dragMoveRef.current)
            document.removeEventListener('touchmove', dragMoveRef.current)
        }
        if (dragUpRef.current) {
            document.removeEventListener('mouseup', dragUpRef.current)
            document.removeEventListener('touchend', dragUpRef.current)
        }
        dragMoveRef.current = null
        dragUpRef.current = null
    }

    const getBaseData = useCallback((transformRect?: { width: number, height: number }): CalculateEvent | undefined => {
        if (!trackRef.current) return
        const {x: trackX, y: trackY, width: trackWidth, height: trackHeight} = trackRef.current.getBoundingClientRect()

        // 用于处理 pointers 状态
        let transformWidth: number
        let transformHeight: number
        if (transformRect) {
            transformWidth = transformRect.width
            transformHeight = transformRect.height
        } else {
            if (!transformRef.current) return
            const baseTransformRect = transformRef.current.getBoundingClientRect()
            transformWidth = baseTransformRect.width
            transformHeight = baseTransformRect.height
        }

        const centerOffsetX = transformWidth / 2;
        const centerOffsetY = transformHeight / 2;

        const offsetX = trackWidth >= transformWidth
            ? (trackWidth - transformWidth) / 2
            : (transformWidth - trackWidth) / -2;

        const offsetY = trackHeight >= transformHeight
            ? (trackHeight - transformHeight) / 2
            : (transformHeight - trackHeight) / -2;

        return {
            trackRef,
            transformRef,
            trackX,
            trackY,
            trackWidth,
            trackHeight,
            transformWidth,
            transformHeight,
            centerOffsetX,
            centerOffsetY,
            offsetX,
            offsetY
        }
    }, [trackRef, transformRef])

    useEffect(() => {
        if (!dragRef.current.flag && offsetCalculate) {
            const baseData = getBaseData()
            if (!baseData) return
            const offsetVal = offsetCalculate(baseData)
            if (!offsetVal) return
            setOffset(offsetVal)
        }
    }, [offsetCalculate, getBaseData])

    useEffect(() => {
        unBindEvent()
        return unBindEvent
    }, [])

    const updateOffset: EventHandle = e => {
        const baseData = getBaseData()
        if (!baseData) return

        const {
            trackX,
            trackY,
            trackWidth,
            trackHeight,
            transformWidth,
            transformHeight,
            centerOffsetX,
            centerOffsetY,
        } = baseData
        const {pageX, pageY} = getPosition(e);

        const sideWidth = inside ? centerOffsetX : 0
        const sideHeight = inside ? centerOffsetY : 0

        const offsetX = Math.max(sideWidth, Math.min(pageX - trackX, trackWidth - sideWidth)) - centerOffsetX;
        const offsetY = Math.max(sideHeight, Math.min(pageY - trackY, trackHeight - sideHeight)) - centerOffsetY;

        let calcOffset: TransformOffset

        switch (direction) {
            case 'x':
                calcOffset = {
                    x: offsetX,
                    y: offset.y,
                }
                break;
            case 'y':
                calcOffset = {
                    x: offset.x,
                    y: offsetY,
                }
                break;
            default:
                calcOffset = {
                    x: offsetX,
                    y: offsetY,
                }
        }

        // Exclusion of boundary cases
        if (
            (transformWidth === 0 && transformHeight === 0) ||
            transformWidth !== transformHeight
        ) {
            return false;
        }

        setOffset(calcOffset);
        onDragChange?.(calcOffset, {
            trackRef,
            transformRef,
            trackX,
            trackY,
            trackWidth,
            trackHeight,
            transformWidth,
            transformHeight,
            centerOffsetX,
            centerOffsetY,
            sideWidth,
            sideHeight,
            offsetX,
            offsetY,
        });
    }

    const handleDragMove: EventHandle = e => {
        e.preventDefault()
        updateOffset(e)
    }

    const handleDragEnd: EventHandle = e => {
        e.preventDefault()
        unBindEvent()
        dragRef.current.flag = false
        onDragChangeComplete?.()
    }

    const handleDragStart: EventHandle = e => {
        if (disabled) return
        updateOffset(e)
        dragRef.current.flag = true
        document.addEventListener('mousemove', handleDragMove)
        document.addEventListener('mouseup', handleDragEnd)
        document.addEventListener('touchmove', handleDragMove)
        document.addEventListener('touchend', handleDragEnd)
        dragMoveRef.current = handleDragMove
        dragUpRef.current = handleDragEnd
    }

    return [offset, handleDragStart, {getBaseData}] as const
}

export default useColorDrag
