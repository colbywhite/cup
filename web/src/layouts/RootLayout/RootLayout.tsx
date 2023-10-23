import type { PropsWithChildren } from 'react'

import NavBar from 'src/components/NavBar/NavBar'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-screen w-screen grid-cols-1 grid-rows-[4rem_1fr] gap-2">
      <NavBar />
      <main className="flex items-center justify-center text-center">
        {children}
      </main>
    </div>
  )
}

export default RootLayout
