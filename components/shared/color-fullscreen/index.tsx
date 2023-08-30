import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ColorFullScreen = (props: {
  show: boolean;
  color: string;
  onClose?: () => void;
}) => {
  const { show, color, onClose } = props

  if (!show) return null;

  return <div className="fixed inset-0 z-[999]">
    <Button className="absolute right-4 top-4 z-20" variant="outline" size="icon" onClick={() => onClose?.()}>
      <X className="h-4 w-4" />
    </Button>
    <div className="absolute insert-0 z-10 w-full h-full" style={{ backgroundColor: color }} />
  </div>
}

ColorFullScreen.displayName = "ColorFullScreen";

export default ColorFullScreen;
