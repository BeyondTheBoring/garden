import dynamic from 'next/dynamic'

const DigitalGardenExplainer = dynamic(() => import('./DigitalGardenExplainer'))

export { DigitalGardenExplainer }
