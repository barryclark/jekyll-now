# SageMaker

---

## —Table of Contents—

---

## SageMaker Processing

#### Local Mode

If `arguments` is provided, `entrypoint` is required, although aws mentioned it is not. 

```python
processor = Processor(
		...
    entrypoint=["python3", "evaluation.py"]
)

processor.run(
    arguments=[
        "--onnx_filename", "tf_bert_for_token_classification.onnx",
    ],
		...
)
```

#### ProcessingOutput

For source in processing output, you cannot specify a file, but only directory

## SageMaker Experiment

#### download experiment result

```python
import pandas as pd
from sagemaker.analytics import ExperimentAnalytics

def save_experiment_df(experiment_name: str) -> pd.DataFrame:
    trial_component_analytics = ExperimentAnalytics(
        experiment_name=experiment_name,
        input_artifact_names=[]
    )
    df = trial_component_analytics.dataframe()
    df.to_csv(f"experiment-{experiment_name}.csv")
    return

if __name__ == "__main__":
    save_experiment_df("tune-features-20220324")
```