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
      <main className="my-14 max-w-3xl mx-auto text-gray-700 xs:my-16 xs:text-lg lg:my-20 lg:max-w-4xl lg:text-xl xl:my-24">
        {title && (
          <h1 className="text-2xl font-bold tracking-tighter text-center text-gray-900 xs:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </h1>
        )}
        <div {...props}></div>
      </main>
    </Container>
  )
}
