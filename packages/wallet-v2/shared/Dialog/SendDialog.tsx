'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Info, Send } from 'atomize_icons';
import DialogLayout from './DialogLayout';
import { Input } from '@/components/ui/input';

const SendDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DialogLayout
        open={isOpen}
        onOpenChange={closeDialog}
        title="Send"
        trigger={
          <>
            <Button
              size="lg"
              className="block w-full px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
              onClick={openDialog} // Open the dialog when the button is clicked
            >
              <Send /> Send
            </Button>
          </>
        }
        footerContent={
          <>
          <Button
              size="lg"
              className="py-4 w-full bg-[#F4FBFF66] border border-[#F4FBFF66] !rounded-full font-semibold border-none"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="py-4 w-full bg-gradient-to-tr to-[#2778E9] from-[#439FE7] text-white !rounded-full"
              onClick={() => {
                // Perform the delete action here
                console.log('Account deleted');
                closeDialog();
              }}
            >
              Confirm
            </Button>
            
          </>
        }
      >
        <div className="space-y-5">
          <div className='space-y-2'>
            <h4 className="font-semibold ml-4">To</h4>
            <Input
              className="sblock w-full px-5 py-7 !bg-[#FFFFFF12] !rounded-full border border-[#FFFFFF33] text-white"
              placeholder="Paste recipient address here"
            />
            <div className="flex items-center text-[#FFFFFFC2] space-y-2">
              <Info className="mr-2" aria-hidden="true" />
              <p className="text-sm">
                Please only enter a valid Avail address. Sending funds to a different network might
                result in permanent loss.
              </p>
            </div>
          </div>
          <div className='space-y-2'>
            <h4 className="font-semibold ml-4">Amount</h4>
            <Input
              className="sblock w-full px-5 py-7 !bg-[#FFFFFF12] !rounded-full border border-[#FFFFFF33] text-white"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Seed Phrase</h4>
            <span className="cursor-pointer font-semibold">
              {false ? (
                <>
                  <Copy className="inline" /> Copy to clipboard{' '}
                </>
              ) : (
                <span className="text-[#2AE77F]">
                  <CheckCircledIcon className="inline-block" /> Copied
                </span>
              )}
            </span>
          </div>
          <Textarea
            className="inline-block w-full px-5 py-4 !bg-[#FFFFFF12] rounded-3xl min-h-[7rem] border border-[#FFFFFF33] !text-2xl text-white resize-none"
            disabled
            value="******************************************************************"
          />
          <div className="flex items-center text-[#FF7373]">
            <Info className="mr-2" aria-hidden="true" />
            <p className="text-sm">
              Make sure no one is looking at your screen. MetaMask Support will never request this.
            </p>
          </div>
        </div> */}
      </DialogLayout>
    </>
  );
};

export default SendDialog;
