import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRight } from 'atomize_icons'
import { motion } from 'framer-motion'

interface TextCardProps {
  title: string
  content: string
  link: string
}

export const TextCard: React.FC<TextCardProps> = ({ title, content, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="bg-white/5 border-2 border-white/10 rounded-2xl h-full flex flex-col">
        <CardHeader className="pb-2">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-white/75">{content}</p>
        </CardContent>
        <CardFooter className="pt-4">
          <a
            href={link}
            className="text-white flex items-center underline transition-all duration-300"
          >
            Read more <ArrowRight className="ml-2" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
