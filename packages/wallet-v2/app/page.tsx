import Image from 'next/image';
import Line from '@/assets/images/line.svg';
import { TextCard } from '@/shared/TextCard';

export default function Home() {
  return (
    <div className="py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="my-10">
        {/* Responsive Image */}
        <Image
          src={Line}
          alt="Lines"
          width={100}
          height={10}
          className="w-full pb-8 relative"
        />

        {/* Centered content */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold">-- AVL</h2>
          <p className="mt-3 font-semibold text-lg sm:text-xl text-[#FFFFFF7A]">0.00 USD</p>
        </div>

        {/* Second Line Image */}
        <Image
          src={Line}
          alt="Lines"
          width={100}
          height={10}
          className="w-full pt-8 relative"
        />
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <TextCard
          title="What is snap?"
          content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
          link="#"
        />
        <TextCard
          title="Learn more about Avail?"
          content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
          link="#"
        />
        <TextCard
          title="Get testnet tokens"
          content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
          link="#"
        />
      </div>
    </div>
  );
}
