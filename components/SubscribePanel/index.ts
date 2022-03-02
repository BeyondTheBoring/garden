import dynamic from 'next/dynamic'

const SubscribePanel = dynamic(() => import('./SubscribePanel'))

export { SubscribePanel }
