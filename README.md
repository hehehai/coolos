<a name="readme-top"></a>

<div align="center">

<img height="100" src="https://user-images.githubusercontent.com/12692552/283310014-07f094f2-7662-4e32-a44a-9b2dd6117761.png">
<h1>Coolos</h1>

Discover Colors with Speed and Ease: Your Quick and Simple Color Companion!
<br/>
Coolos is a color picker website developed using the Next.js technology stack, inspired by [Coolors](https://coolors.co/).

[![][vercel-shield]][vercel-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

![](https://user-images.githubusercontent.com/12692552/283363370-8847eb3f-dd4e-498e-986d-ac881e2d296f.png)

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [✨ Features](#-features)
- [🛠️ Technology stack](#-technology-stack)
- [📸 Snapshot](#-snapshot)
- [🛳 Self Hosting](#-self-hosting)
  - [Deploying with Vercel](#deploying-with-vercel)
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

> \[!IMPORTANT]
>
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

## 🛳 Self Hosting

### Deploying with Vercel

If you want to deploy this service yourself on Vercel, you can follow these steps:

- Config env [Environment Variable](#environment-variable)
- After deployment, you can start using it.
- Bind a custom domain (optional): The DNS of the domain assigned by Vercel is polluted in some areas; binding a custom domain can connect directly.

<div align="center">

[![][deploy-button-image]][deploy-link]

</div>

> \[!TIP]
> If you are a Chinese user, you can configure vercel China Resolution address
> [CNAME]: cname-china.vercel-dns.com

<br/>

### Environment Variable

This project provides some additional configuration items set with environment variables:

| Environment Variable                  | Required | Description                                                                                                                     | Example                 |
| ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL`                 | Yes      | This is the absolute address of the application URL.                                                                            | `http://localhost:3000` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`   | Yes      | Clerk Auth [doc](https://clerk.com/docs/quickstarts/nextjs#set-environment-keys)                                                | `pk_test_xxxxx`         |
| `CLERK_SECRET_KEY`                    | Yes      | Clerk Auth [doc](https://clerk.com/docs/quickstarts/nextjs#set-environment-keys)                                                | `sk_test_xxxxx`         |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`       | Yes      | Clerk After SignIn [doc](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables) | `/sign-in`              |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`       | Yes      | Clerk After SignIn [doc](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables) | `/sign-up`              |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Yes      | Clerk After SignIn [doc](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables) | `/`                     |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Yes      | Clerk After SignIn [doc](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables) | `/`                     |
| `POSTGRES_URL`                        | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_PRISMA_URL`                 | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_URL_NON_POOLING`            | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_USER`                       | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_HOST`                       | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_PASSWORD`                   | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `POSTGRES_DATABASE`                   | Yes      | Vercel Postgres [doc](https://vercel.com/docs/storage/vercel-postgres/quickstart#review-what-was-created)                       | `xxxxx`                 |
| `RESEND_API_KEY`                      | Yes      | Resend API key                                                                                                                  | `xxxxx`                 |

- [Vercel Postgres SQL](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Postgres Prisma config](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#prisma)

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## ⌨️ Local Development

You can use GitHub Codespaces for online development:

[![][codespaces-shield]][codespaces-link]

Or clone it for local development:

[![][bun-shield]][bun-link]

```fish
git clone https://github.com/hehehai/coolos.git
cd coolos
bun install
bun dev
```

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Contributions of all types are more than welcome; if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-link]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

<details><summary><h4>📝 License</h4></summary>

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhehehai%2Fcoolos.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhehehai%2Fcoolos?ref=badge_large&issueType=license)

</details>

Copyright © 2023 [Coolos][profile-link]. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[codespaces-shield]: https://github.com/codespaces/badge.svg
[codespaces-link]: https://codespaces.new/hehehai/coolos
[deploy-button-image]: https://vercel.com/button
[deploy-link]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhehehai%2Fcoolos&project-name=coolos&repository-name=coolos
[profile-link]: https://github.com/hehehai/coolos
[pr-welcome-link]: https://github.com/hehehai/coolos/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🌈_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[contributors-link]: https://github.com/hehehai/coolos/graphs/contributors
[contributors-contrib]: https://contrib.rocks/image?repo=hehehai/coolos
[github-stars-link]: https://github.com/hehehai/coolos/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/hehehai/coolos?color=ffcb47&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/hehehai/coolos/issues
[github-issues-shield]: https://img.shields.io/github/issues/hehehai/coolos?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/hehehai/coolos/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/hehehai/coolos?color=8ae8ff&labelColor=black&style=flat-square
[vercel-link]: https://coolos.vercel.app
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https%3A%2F%2Fcoolos.vercel.app
