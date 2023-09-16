"use client"

import { useState } from "react"

import { Color, generateColor } from "@/components/shared/color-picker"

const ColorPalette = () => {
  // 获取路由的参数
  // 色板块颜色参数

  const [palette, setPalette] = useState<Color[]>([
    generateColor("#2DE1C2"),
    generateColor("#6AD5CB"),
    generateColor("#7FBEAB"),
    generateColor("#7E998A"),
    generateColor("#85877C"),
  ])

  // 渲染色板操作条
  // 渲染颜色块
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-16 w-full items-center justify-between bg-gray-300 px-3">
        <div>tool bar</div>
        <div className="flex items-center space-x-3">
          <div>isolate mode</div>
          <div>zen mode</div>
          <div>secondary info SELECT</div>
          <div>prev</div>
          <div>next</div>
          <div>Adjust palette</div>
          <div>Quick view</div>
          <div>Export</div>
          <div>Save</div>
        </div>
      </div>
      <div className="w-full grow">
        <div className="flex h-full w-full items-stretch justify-between">
          {palette.map((color, idx) => {
            return (
              <div
                key={idx}
                className="flex h-full grow flex-col items-center justify-center space-y-3"
                style={{
                  backgroundColor: color.toHexString(),
                }}
              >
                <div>Add</div>
                <div>Remove</div>
                <div>Save</div>
                <div>Drag</div>
                <div>Copy</div>
                <div>{color.toHex()}</div>
                <div>Second info</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ColorPalette
