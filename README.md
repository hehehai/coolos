<a name="readme-top"></a>

<div align="center">

<img height="100" src="https://user-images.githubusercontent.com/12692552/283310014-07f094f2-7662-4e32-a44a-9b2dd6117761.png">
<h1>Coolos</h1>

Coolos is a color picker website developed using the Next.js technology stack, inspired by [Coolors](https://coolors.co/).

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
- [🛠️ Technology stack](#-technology-stack)
- [📸 Snapshot](#-snapshot)
- [🛳 Steup](#-self-hosting)
  - [`A` Deploying with Vercel](#a-deploying-with-vercel)
  - [Environment Variable](#environment-variable)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)

####

<br/>

</details>

## ✨ Features

- [x] 💡 **Color Picker**: Users can easily select colors using the color picker tool, allowing them to choose from a wide range of colors and obtain their corresponding color codes.
- [x] 🌈 **Color Generator**: The website provides a color generator feature that generates random colors or suggests color combinations based on user preferences, helping users discover new color schemes.
- [x] 🎨 **Color Palette**: Users can create and manage color palettes, allowing them to organize and save their favorite colors for future reference.
- [x] 🌓 **Color Contrast**: The website offers a color contrast feature that allows users to check the contrast between two colors, ensuring accessibility and readability in design.
- [x] 📊 **Palette Rankings**: Users can explore popular color palettes through the palette rankings, providing inspiration and trends for color selection.
- [x] 🔐 **Login and Account Management**: The website supports user accounts, allowing users to create an account, log in, and manage their saved colors and palettes across multiple devices.
- [x] 💾 **Color and Palette Saving**: Users can save their selected colors and created palettes, ensuring that they can access and use them later.
- [x] 🎨 \*\*Color Editing: The website provides tools for modifying and adjusting colors, including brightness, saturation, and hue, allowing users to fine-tune their color choices.
- [x] 🌈 **Color Scheme Suggestions**: Users can receive color scheme suggestions based on their selected colors or preferences, assisting them in creating harmonious and visually appealing designs.

> **Important**\
> **Star Us**, You will receive all release notifications from GitHub without any delay \~ ⭐️

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🛠️ Technology stack

- [Vercel](https://vercel.com)
- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com)
- [Prisma](https://www.prisma.io)
- [Resend](https://resend.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwindcss](https://tailwindcss.com)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📸 Snapshot

## 🛳 Steup

### `A` Deploying with Vercel

### Environment Variable

## ⌨️ Local Development

## 🤝 Contributing

---

<details><summary><h4>📝 License</h4></summary>

[![][fossa-license-shield]][fossa-license-link]

</details>

Copyright © 2023 [LobeHub][profile-link]. <br />
This project is [MIT](./LICENSE) licensed.

- intro
- stack
- run
- liense

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

[fossa-license-link]: https://app.fossa.com/projects/git%2Bgithub.com%2Fhehehai%2coolos
[profile-link]: https://github.com/hehehai/coolos
[github-stars-link]: https://github.com/hehehai/coolos/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/hehehai/coolos?color=ffcb47&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/hehehai/coolos/issues
[github-issues-shield]: https://img.shields.io/github/issues/hehehai/coolos?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/hehehai/coolos/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/hehehai/coolos?color=white&labelColor=black&style=flat-square
[vercel-link]: https://coolos.vercel.app
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https%3A%2F%2Fcoolos.vercel.app
