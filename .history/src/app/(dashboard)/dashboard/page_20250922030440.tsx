import { Button } from '@/components/ui/button'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <Button onClick={
        async () => {
          "use server"
         await si("hello from dashboard button")
        }
      }>Dashboard Button</Button>
    </div>
  )
}

export default DashboardPage