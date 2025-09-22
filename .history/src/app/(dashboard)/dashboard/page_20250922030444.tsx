import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <Button onClick={
        async () => {
          "use server"
         await signOut("hello from dashboard button")
        }
      }>Dashboard Button</Button>
    </div>
  )
}

export default DashboardPage