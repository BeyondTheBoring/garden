import Almond from '@/assets/icons/outline/almond.svg'
import { GrowthStage } from '@/enums/GrowthStage'

const icons: Record<GrowthStage, React.ElementType | null> = {
  SEED: Almond,
  SEEDLING: null,
  SAPLING: null,
  TREE: null,
  FRUIT: null,
}

export interface GrowthStageIconProps extends React.ComponentProps<'svg'> {
  stage: GrowthStage
}

export default function GrowthStageIcon({
  stage,
  ...props
}: GrowthStageIconProps) {
  const Icon = icons[stage.toUpperCase() as GrowthStage]
  return Icon ? (
    <Icon role="img" aria-label={`Growth stage ${stage}`} {...props} />
  ) : null
}
