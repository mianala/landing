import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'

export default function Register() {
  return (
    <>
      <Head>
        <title>Sign Up - Pocket</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?{' '}
            <Link href="/login" className="text-cyan-600">
              Sign in
            </Link>{' '}
            to your account.
          </>
        }
      >
        <form>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <SelectField
              className="col-span-full"
              label="How did you hear about us?"
              id="referral-source"
              name="referral_source"
            >
              <option>Google Search</option>
              <option>Facebook</option>
              <option>Twitter</option>
              <option>Youtube</option>
            </SelectField>
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Get started today
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}
