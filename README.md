<a name="readme-top"></a>

<div align="center">

<h1>Coolos</h1>

Coolors is a color picker website developed using the Next.js technology stack, inspired by [Coolors](https://coolors.co/).

[![][vercel-shield]][vercel-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

![](https://user-images.githubusercontent.com/12692552/280527804-aa8ac288-5302-4371-b737-9a96f26a33bd.jpg)

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [✨ Features](#-features)
- [📸 Snapshot](#-snapshot)
- [🛳 Steup](#-self-hosting)
  - [`A` Deploying with Vercel](#a-deploying-with-vercel)
  - [Environment Variable](#environment-variable)
- [📦 Ecosystem](#-ecosystem)
- [🧩 Plugins](#-plugins)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)

####

<br/>

</details>

- intro
- stack
- run
- liense

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

<!-- LINK GROUP -->
[github-stars-link]: https://github.com/hehehai/coolos/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/hehehai/coolos?color=ffcb47&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/hehehai/coolos/issues
[github-issues-shield]: https://img.shields.io/github/issues/hehehai/coolos?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/hehehai/coolos/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/hehehai/coolos?color=white&labelColor=black&style=flat-square
[vercel-link]: https://coolos.vercel.app
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https%3A%2F%2Fcoolos.vercel.app
