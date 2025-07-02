import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const cards = [
  {
    title: 'What is snap?',
    description:
      'Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys.',
    link: { text: 'Read more', href: '#' }
  },
  {
    title: 'Learn more about Avail?',
    description:
      'Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys.',
    link: { text: 'Read more', href: '#' }
  },
  {
    title: 'Get testnet tokens',
    description:
      'Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys.',
    link: { text: 'Go to faucet', href: '#' }
  }
];

export default function InfoCards() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full mt-8">
      {cards.map((card, i) => (
        <Card
          key={i}
          className="flex-1 bg-[rgba(255,255,255,0.04)] text-white p-6 rounded-2xl border border-[rgba(255,255,255,0.07)]"
        >
          <CardContent className="flex flex-col gap-2 p-0">
            <CardTitle className="text-2xl font-bold mb-2">{card.title}</CardTitle>
            <div className="text-white/80 text-sm mb-">{card.description}</div>
            <Link
              target="_blank"
              href={card.link.href}
              className="text-white underline underline-offset-4 hover:text-[#338FFF] text-sm font-medium flex items-center gap-1"
            >
              {card.link.text} <span aria-hidden>→</span>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
