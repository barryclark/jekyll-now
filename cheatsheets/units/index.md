---
layout: page
title: CSS Units
---
## Reference
- MDN: [Values and Unites](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

## Best practices
### Classic units
- `px`
  - 96 pixels = 1 "inch"
    - Defined in the core browser settings. It's rarely 1 inch.
  - Often only used for:
    - Setting `font-size`;
    - Setting image `width` and `height`;
    - Setting a `1px` border.
- `%`
  - Represents a fraction of some other value. For example, when defined for `width`, it's a fraction of the parent element's width.
  - Most often used for repnsive images:

    ```css
    img {
      max-width: 100%;
    }
    ```

### Font-based units
- `em`
  - If setting `font-size`: `1em` is equal to the  `font-size` of the parent element.
    - Avoid setting `font-size` in `em` units. Use `px` or `rem` instead.
  - If setting a length for another property: `1em` is equal to the `font-size` of the element itself.
- `rem`
  - Font size of the root element.
  - When in doubt, no one got fired for using `rem` units.
- `ch`
  - The advance measure (width) of the glyph "0" of the element's font.
  - Tony loooooves setting setting text boxes in `ch` units.
  - Warning: the value of `ch` changes with different `font-family` declarations. Don't use `ch` if you need a consitent width.
  - See: [Length comparison: rem vs ch](https://codepen.io/browsertherapy/pen/RwRPrvm)

# Viewport
- `vh`, `vw`, `vmin`, `vmax`
  - Used for global page layout.
  - They lose their effectiveness for local layouts.
