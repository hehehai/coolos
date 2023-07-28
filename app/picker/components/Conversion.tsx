// TODO: 在 color picker 中导出 coolors 支持的色彩模式, 封装，根据不同模式，获取的颜色 string 活 struct

import { Color } from "@/components/shared/color-picker";
import { IconCopy } from "@/components/icons";
import { memo } from "react";

const ConversionBlock: React.FC<{
  color: string,
  label: string
}> = memo((props) => {
  // TODO: block 需要支持 copy 颜色，成功后显示 copy success 弹窗（可以封装 hook 以及图标组件）
  return <div className={'flex items-center justify-between'}>
    <div>{props.label}</div>
    <div>
      <IconCopy />
      <div>{props.color}</div>
    </div>
  </div>
})

ConversionBlock.displayName = 'ConversionBlock'

export const Conversion: React.FC<{
  color: Color,
}> = () => {
  // 便利 颜色模式，循环展示 block, 布局可以使用 col-2, 采用斑马条纹区别 block
  return <div>

  </div>
}
