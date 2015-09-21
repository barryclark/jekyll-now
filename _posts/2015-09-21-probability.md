---
layout: post
title: Probability
tags: [math]
mathjax: true
---

Say we have a hungry caterpillar that wants to eat a leaf off of a tree. There are ten trees it can choose from. So, as far as we know, the probability of it choosing a specific tree is ${1 \over 10}=10%=0.10$. Once it chooses a tree, and that tree has 100 branches, then the probability of choosing a specific branch is ${1 \over 100}=1%=0.01$. Finally, once it chooses a branch, and that branch has 25 leaves, then the probability of it choosing a specific leaf is ${1 \over 25}=4%=0.04$. So, before it has chosen a tree, the probability of it choosing a specific leaf is: $$0.10×0.01×0.04=0.00004=0.004%={1 \over 25000}$$ This makes sense because there are $10×100×25=25000$ leaves total to choose from.

When you multiply probabilities together, you will end up with a smaller probability unless one probability is $1.00=100%$. For instance, let’s say all the probabilities are $0.90=90%$ and that there are ten probabilities. Then, the resulting probability is: <div class="abs_center">$$0.90×0.90×0.90×0.90×0.90×0.90×0.90×0.90×0.90×0.90=0.90^{10}≈0.3486784401≈34.86%$$</div>

Also, probabilities are typically only useful if you don’t have all the information. If you had all the information, the probability would either be $0%$ or $100%$. It is typically impossible to know all the information – especially if that information only exists in the future. Additional information can also change what the probability is. Take our caterpillar. Let’s say he’s a maple-loving specie of caterpillar, and half our trees are oak, and half our trees are maple. Now his probability of choosing a specific oak leaf is $0%$, while his probability of choosing a specific maple leaf is: $$0.20×0.01×0.04=0.00008=0.008%={1 \over 12500}$$ Also, if we don’t know what type of tree he likes, but somehow we determine there is a $50%$ of him being eaten by a bird before he gets to eat a leaf, then the probability of him eating a specific leaf is: $$0.50 ×0.10×0.01×0.04=0.00002=0.002%={1 \over 50000}$$ Also – probability isn’t really like something might or might not happen. Just because we don’t know what kind of tree he prefers, doesn’t mean he doesn’t have a preference. Just because we don’t know a bird is going to eat him, doesn’t mean the bird won’t.

Something else that might affect probability is scope. With all the previous caterpillar examples, I always said "a specific leaf." Before the bird came into the equation, the probability that he was going to eat a leaf, any leaf, was $100%$. After the bird, it was $50%$. 
