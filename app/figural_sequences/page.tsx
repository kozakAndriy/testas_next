'use client'
import dynamic from 'next/dynamic'

const ClientComponent = dynamic(() => import('./client_page'), {
  ssr: false
})

export default function ClientComponentNoSSR() {
  return <ClientComponent />;
}