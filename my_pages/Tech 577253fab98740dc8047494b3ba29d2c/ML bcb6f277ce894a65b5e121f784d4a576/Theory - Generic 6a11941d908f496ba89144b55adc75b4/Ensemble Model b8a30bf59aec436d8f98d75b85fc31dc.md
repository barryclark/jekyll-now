# Ensemble Model

## Concept

- Meta-model - a model we train to average the result of other models

## Some techniques to do it

- Stacking
    - advantage of stacking is that it can benefit even from models that don't perform very well
- Blending
    - require that models have a similar, good predictive power.
    - Blending ensembles are a type of stacking where the meta-model is fit using predictions on a `holdout validation dataset` instead of `out-of-fold predictions`.