# Parse Arguments

## Via argparse

#### Prepare for argument input

```python
import argparse

def main(args):
	# do something here
	pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--model_name", type=str, default="bert-base-multilingual-cased"
    )
    parser.add_argument("--batch_size", type=int, default=1)
    parser.add_argument("--epochs", type=int, default=20)
    parser.add_argument("--learning_rate", type=float, default=0.00001)

    args, _ = parser.parse_known_args()

    print(f"model_name: {args.model_name}")
    print(f"batch_size: {args.batch_size}")
    print(f"learning_rate: {args.learning_rate}")
    print(f"epochs: {args.epochs}")

    main(args)
```

# Via `click`

[https://click.palletsprojects.com/en/8.1.x/](https://click.palletsprojects.com/en/8.1.x/)

example:

```python
import click

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Your name',
              help='The person to greet.')
def hello(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for x in range(count):
        click.echo(f"Hello {name}!")

if __name__ == '__main__':
    hello()
```