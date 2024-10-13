import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRight } from 'atomize_icons'
interface Props {
    title: string,
    content: string,
    link: string
}
export const TextCard = ({title, content, link}: Props) => {
  return (
    <Card className="bg-[#FFFFFF0A] border border-[#FFFFFF12]">
          <CardHeader className="pb-2">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className=" text-sm text-white">
              {content}
            </p>
            <CardFooter className="pl-0 m-0">
              <a href={link} className="text-white flex items-start underline ml-0">
                Read more <ArrowRight className="ml-2" />
              </a>
            </CardFooter>
          </CardContent>
        </Card>
  )
}
