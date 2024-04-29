import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <Link href='/sign-in'>
        <Button>Log in</Button>
      </Link>
      <Link href='/sign-up'>
        <Button>Register</Button>
      </Link>

    </div>
  )
}

export default LandingPage;