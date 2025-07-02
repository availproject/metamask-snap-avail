'use client';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import useWalletStore from '@/lib/store';

const Footer = () => {
  const { blockNumber, blockHash, connected, refreshBlockInfo } = useWalletStore();
  const [prevBlockNumber, setPrevBlockNumber] = useState(blockNumber);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (connected) {
      refreshBlockInfo();
    }
  }, [connected, refreshBlockInfo]);

  useEffect(() => {
    if (blockNumber !== prevBlockNumber) {
      setIsUpdating(true);
      setPrevBlockNumber(blockNumber);
      // Reset animation state after animation completes
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [blockNumber]);

  const formatBlockHash = (hash: string) => {
    if (!hash) return '0000...0000';
    return `${hash.slice(0, 4)}...${hash.slice(-4)}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 border-t border-[rgba(255,255,255,0.07)] px-3 sm:px-6 py-2 flex flex-col sm:flex-row items-center sm:justify-between text-[11px] sm:text-xs text-white/80 font-mono bg-[#23242B] sm:bg-transparent gap-2 sm:gap-0">
      <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto overflow-x-auto whitespace-nowrap">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
          <span className="font-semibold text-white">Latest Data:</span>
        </span>
        <span>
          Block number: <span className="font-bold text-white relative inline-block min-w-[60px]">
            <span
              key={blockNumber}
              className={`block transition-all duration-500 ${
                isUpdating ? 'animate-slideUp' : ''
              }`}
            >
              {blockNumber || '0'}
            </span>
          </span>
        </span>
        <span className="mx-2 hidden sm:inline">|</span>
        <span>
          Block Hash: <span className="font-bold text-white relative inline-block min-w-[60px]">
            <span
              key={blockHash}
              className={`block transition-all duration-500 ${
                isUpdating ? 'animate-slideUp' : ''
              }`}
            >
              {formatBlockHash(blockHash)}
            </span>
          </span>
        </span>
      </div>
      <div className="flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="hover:text-white"
        >
          <Image src="/discord.svg" alt="Discord" width={18} height={18} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-white"
        >
         <Image src="/github.svg" alt="GitHub" width={18} height={18} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-white"
        >
          <Image src="/twitter.svg" alt="Twitter" width={18} height={18} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-white"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={18} height={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
