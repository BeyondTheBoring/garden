import QuestionIcon from '@/assets/icons/outline/question.svg'
import { BlockQuote, BlockQuoteProps } from '@/components/BlockQuote'

export interface QuestionProps extends BlockQuoteProps {
  title: string
}

export default function Question({ title, children, ...props }: QuestionProps) {
  return (
    <BlockQuote {...props} className="border-violet-400 bg-violet-50">
      <span className="flex items-center space-x-2 font-bold text-gray-900">
        <QuestionIcon className="inline-block h-6 w-6 text-violet-900 md:h-7 md:w-7" />
        <span className="inline-block">{title}</span>
      </span>
      {children}
    </BlockQuote>
  )
}
