import { createCn } from "cn/config";

/*
  shadcn's `cn` only knows Tailwind's default scales, so this site's custom
  `--radius-*` and `--text-*` tokens pass through unmerged. That silently lets
  a base class win over an override (e.g. Card's `rounded-xl` beating
  `rounded-card`, because the latter sorts earlier in the emitted CSS).
  Teaching `cn` the site's scales makes overrides behave as written.
*/
const cn = createCn({
  extend: {
    classGroups: {
      rounded: [
        { rounded: ["small", "medium", "card", "button", "input", "pill"] },
      ],
      "font-size": [
        {
          text: [
            "caption",
            "body-sm",
            "body",
            "body-lg",
            "subheading",
            "heading-sm",
            "heading",
            "heading-lg",
            "heading-2xl",
            "heading-3xl",
            "display",
          ],
        },
      ],
      "border-color": [
        {
          border: [
            "canvas",
            "surface",
            "surface-muted",
            "feature",
            "plasma",
            "tag",
            "ink",
            "ink-muted",
            "hairline",
            "chalk",
            "arizona-red",
            "arizona-blue",
          ],
        },
      ],
      "bg-color": [
        {
          bg: [
            "canvas",
            "surface",
            "surface-muted",
            "feature",
            "plasma",
            "tag",
            "ink",
            "chalk",
            "azurite",
            "shade",
            "rain",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "canvas",
            "surface",
            "surface-muted",
            "feature",
            "plasma",
            "tag",
            "ink",
            "ink-muted",
            "chalk",
            "azurite",
          ],
        },
      ],
    },
  },
});

export { cn };