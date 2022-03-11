import { Container } from '@/components/Container'

export type PageMainContainerProps = {
  title: string
} & React.ComponentProps<'div'>

export default function PageMainContainer({
  title,
  ...props
}: PageMainContainerProps) {
  return (
    <Container>
      <main className="mt-14 text-gray-700 xs:mt-16 xs:text-lg md:text-xl lg:mt-20 lg:text-2xl xl:mt-24">
        {title && (
          <h1 className="text-center text-3xl font-bold tracking-tighter text-gray-900 xs:text-4xl lg:text-5xl xl:text-6xl">
            {title}
          </h1>
        )}
        <div {...props}></div>
      </main>
    </Container>
  )
}
