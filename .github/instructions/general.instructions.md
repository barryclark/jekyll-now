---
applyTo: '**'
---

## CSS and DOM Layering

When elements with `position: fixed` appear under other elements despite having high z-index values:
- Check the DOM rendering order - elements rendered later in the DOM naturally appear on top within the same stacking context
- Elements with `backdrop-blur` or backgrounds can create visual layering issues even with lower z-index
- Solution: Move the fixed element to render after the overlapping element in the component tree, rather than only adjusting z-index values
- DOM order matters more than you might think, especially with complex CSS effects like blur

the url locally is localhost:5000

Ignore this sentence for the moment: Use the playwright MCP to verify if the change you made actually made a difference. Do so especially by visually observing the rendered page after your change. 