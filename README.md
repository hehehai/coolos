# Coolos

a color tool site <https://coolos.vercel.app>

## run

on root create `.env.local` file by template `.env.example`

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=ClerkAppKey
CLERK_SECRET_KEY=ClerkAppSecret

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

please use bun <https://bun.sh>

```bash
bun i
bun dev
```
