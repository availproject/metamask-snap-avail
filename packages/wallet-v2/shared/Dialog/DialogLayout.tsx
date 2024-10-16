// components/ui/DialogLayout.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface DialogLayoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
  trigger: React.ReactNode;
  closeButton?: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footerContent,
  closeButton,
  trigger
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#252831] space-y-8 p-6 min-w-[530px] !rounded-3xl border-[3.2px] border-[#303441]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="mb-6 text-2xl font-semibold">{title}</DialogTitle>
          </div>
          <Separator className='bg-[#FFFFFF1F]' />
        </DialogHeader>
        <div className="mt-6 space-y-8">{children}</div>
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLayout;
