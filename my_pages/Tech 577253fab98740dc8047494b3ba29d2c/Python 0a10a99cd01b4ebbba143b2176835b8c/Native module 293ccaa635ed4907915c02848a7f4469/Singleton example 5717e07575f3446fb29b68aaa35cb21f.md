# Singleton example

## Use `_ _ new _ _`

```python
class InferenceHelper(object):

    _instance = None

    def __new__(cls, *args, **kwargs):
        """A singleton behavior
        Returns:
            InferenceHelper: The instance of InferenceHelper
        """
        if cls._instance is None:
            logger.info('Initialize a new instance of InferenceHelper.')
            cls._instance = super(InferenceHelper, cls).__new__(cls)
            cls._instance._instace_init(*args, **kwargs)
        elif cls._instance._any_new_config(**kwargs):
            # Only do it when there is different config(s)
            cls._instance._instace_init(*args, **kwargs)
        return cls._instance
```

## Use self-defined `get_instance`

```python
class InferenceHelper:

    __instance = None

    @staticmethod
    def get_instance(*args, **kwargs):
        """A singleton behavior
        Returns:
            InferenceHelper: The instance of InferenceHelper
        """
        if InferenceHelper.__instance is None:
            logger.info('Initialize a new instance of InferenceHelper.')
            InferenceHelper(*args, **kwargs)

        return InferenceHelper.__instance

		def __init__(self, *args,  **kwargs):
				if InferenceHelper.__instance is not None:
            raise Exception("You cannot manually create an instance of InferenceHelper! Call the get_instance instead")
        else:
						# Do init job here....
						pass
```