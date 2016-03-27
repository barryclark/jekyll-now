---
layout: post
title: Attention and the ND conv net
---

Following on from the posts exploring more dimensions to convolve in CNNs. I wonder if it is reasonable to use another ‘attention’ net to select which dimensions should be convolved.

# Attention

To solve the problem that this net would need more computations that the standard (2D conv) CNN. I think a good solution would be ...

Another net to decide when/which dimensions to convolve for each kernel and image.

No point convolving over a feature that is already symmetric in that dimension. E.g. rotating a circle, … 

And there is no point convolving over a feature that never never vases in that dimension. E.g. a person standing. As … seperate feature?