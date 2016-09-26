
---
layout: post
title: Working With React and Flux
---

![GraphQL](https://raw.githubusercontent.com/rohan-varma/rohan-blog/gh-pages/images/graphql.png "GraphQL")

Recently, I've been learning a lot about React and Flux while developing a full-stack web application. 
React is a JavaScript library for building user interfaces, and revolves around the idea of writing your components 
in a very declarative way. It can be thought of as the "View" portion of the Model-View-Controller pattern.
Flux is a pattern also developed by Facebook for building web interfaces - it utilizes
the concept of unidirectional data flow, which complements React's components quite well. In this post, we'll take a quick 
look as to how React and Flux can work together to create the components of a dynamic, responsive web application. 

### React Overview
React is a powerful UI library developed at Facebook that uses an innovative diff algorithm to efficiently re-render components when
data changes. With React, we don't interact with the DOM directly - instead, React uses the concept of a Virtual DOM, which is just an abstract, 
lightweight representation of the actual DOM. This virtual DOM can then be manipulated and then saved to the real DOM tree. A major advantage of React
is that this is done in an efficient way through the diffing algorithm used under the hood. The algorithm calculates the minimum number of elements 
it needs to update, and then efficiently re-renders the component by only applying these changes to the actual DOM. Calculating the diff between two trees (or more specifically, the "edit distance" between two trees) is a O(n^3) problem, but React uses heuristics based on a few practical use-case assumptions to bring it down to O(n^3). For more on that, check out the [Docs](https://facebook.github.io/react/docs/reconciliation.html)
