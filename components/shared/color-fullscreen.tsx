import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion'

const fullScreenMotion = {
  visible: { y: 0 },
  hidden: { y: '100%' },
}

const ColorFullScreen = (props: {
  show: boolean;
  color: string;
  onClose?: () => void;
  children?: React.ReactNode
}) => {
  const { show, color, onClose, children } = props

  return <AnimatePresence>
    {show && <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fullScreenMotion}
      transition={{ ease: 'easeIn', duration: 0.2 }}
      className="fixed inset-0 z-[999]"
    >
      <Button className="absolute right-4 top-4 z-20" variant="outline" size="icon" onClick={() => onClose?.()}>
        <X className="h-6 w-6 text-slate-700" />
      </Button>
      <div className="absolute insert-0 z-10 w-full h-full" style={{ backgroundColor: color }}>
        {children}
      </div>
    </motion.div>}
  </AnimatePresence>
}

ColorFullScreen.displayName = "ColorFullScreen";

export default ColorFullScreen;
