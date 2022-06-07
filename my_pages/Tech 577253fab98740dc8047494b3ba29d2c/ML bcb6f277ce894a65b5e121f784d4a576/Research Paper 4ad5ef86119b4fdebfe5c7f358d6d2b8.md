# Research Paper

## NLP

- [Chargrid: Towards Understanding 2D Documents](https://arxiv.org/pdf/1809.08799.pdf)(2018)
    - Chargrid representation :
        - All characters are 1-hot encoded into a mapping integer
        - i.e. the encoding is NOT contextualized
    - [https://github.com/sciencefictionlab/chargrid-pytorch](https://github.com/sciencefictionlab/chargrid-pytorch)
- [BERTgrid: Contextualized Embedding for 2D Document Representation and Understanding](https://arxiv.org/pdf/1909.04948.pdf)(2019)
    - BERTgrid representation :
        - similar to Chargrid, but it is word level & all words are embedded (an array of values) 
        instead of only representing the char as an integer.
        - i.e. the embedding is contextualized