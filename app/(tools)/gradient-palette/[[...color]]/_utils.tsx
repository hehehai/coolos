const paletteSVGTemplate = ({
  link,
  site,
  block,
  width,
  height,
}: {
  block: string
  link?: string
  site?: string
  width: number
  height: number
}) => {
  const siteStr = site
    ? `<text
    x="10"
    y="${height + 15}"
    font-family="Arial"
    font-size="6"
    alignment-baseline="middle"
  >
    Exported from ${site}
  </text>`
    : ""

  const linkStr = link
    ? `<text
  x="490"
  y="${height + 15}"
  font-family="Arial"
  font-size="6"
  alignment-baseline="middle"
  text-anchor="end"
>
  ${link}
</text>`
    : ""

  return `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 ${width} ${height + (siteStr || linkStr ? 30 : 0)}"
      xml:space="preserve"
    >
      ${block}
      ${siteStr}
      ${linkStr}
    </svg>
  `
}

export function genGradientPaletteSVG(
  colors: string[],
  width: number,
  height: number
) {
  const blockWidth = width / colors.length
  const colorBlocks = colors.reduce((acc, color, idx) => {
    const x = idx * blockWidth
    return (
      acc +
      `<rect
      fill="${color}"
      x="${x}"
      y="0"
      width="${blockWidth}"
      height="${height}"
    />`
    )
  }, "")

  return paletteSVGTemplate({
    width,
    height,
    block: colorBlocks,
    site: "Coolors",
    link: `http://localhost:3000/gradient-palette?colors=${colors.at(
      0
    )}-${colors.at(-1)}`,
  })
}
