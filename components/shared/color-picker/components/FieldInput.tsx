import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface FieldInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
  value?: number;
  title: string;
  min?: number;
  max?: number;
  onChange?: (val: number) => void
}

const FieldInput = ({
  title,
  value = 0,
  min = 0,
  max = 100,
  onChange,
  children,

  ...rest
}: FieldInputProps) => {
  const [tmpVal, setTmpVal] = useState<number | string>(Math.trunc(value))

  useEffect(() => {
    setTmpVal(Math.trunc(value))
  }, [value])

  // TODO: 即时修改，需要验证有效性质，否则不修改
  const handleChange = (e: React.SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value
    setTmpVal(val)
  }

  const handleBlur = (e: React.SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value
    if (val === '') {
      onChange?.(0)
    } else if (/[-+]?d*/.test(val)) {
      const newVal = Number.parseInt(val)
      // FIX: 舍去小数，未重新赋值
      setTmpVal(newVal)
      onChange?.(newVal)
    } else {
      setTmpVal(Math.trunc(value))
    }
  }

  return <div className={'space-y-2'}>
    <div className={'flex items-center justify-between'}>
      <label className={'text-sm'}>{title}</label>
      <div>
        <input
          className={cn('number-hide-arrows w-12 px-[5px] h-6 text-xs rounded-md border border-gray-300 text-center border-transparent hover:border-gray-300 focus:border-blue-500')}
          type="number"
          value={tmpVal}
          min={min}
          max={max}
          pattern="[-+]?d*"
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
      </div>
    </div>
    {children}
  </div>
}

FieldInput.displayName = 'FieldInput'

export default FieldInput
