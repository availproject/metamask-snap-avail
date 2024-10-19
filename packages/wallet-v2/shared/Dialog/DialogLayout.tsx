import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

interface DialogLayoutProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
  footerContent: React.ReactNode
  trigger: React.ReactNode
  closeButton?: React.ReactNode
}

const DialogLayout: React.FC<DialogLayoutProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footerContent,
  closeButton,
  trigger,
}) => {
  const dialogAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <AnimatePresence>
        {open && (
          <DialogContent className='!bg-none !border-none '>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>

            <motion.div
              className="bg-[#0f1014] space-y-8 p-6 min-w-[530px] max-w-[90vw] !rounded-3xl border-[3.2px] border-[#303441]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dialogAnimation}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            >
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="mb-6 text-2xl font-semibold">
                    {title}
                  </DialogTitle>
                  {closeButton && <DialogClose>{closeButton}</DialogClose>}
                </div>
                <Separator className="bg-[#ffffff14]" />
              </DialogHeader>
              <div className="mt-6 space-y-8">{children}</div>
              <DialogFooter>{footerContent}</DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default DialogLayout