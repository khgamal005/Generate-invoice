import { Button } from '@/components/ui/button'
import { auth, signOut } from "@/lib/auth";
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <Button onClick={
        async () => {
          "use server"
         await signOut()
        }
      }>Logout</Button>
    </div>
  )
}

export default DashboardPage