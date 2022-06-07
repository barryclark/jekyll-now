# Logger setup

## Logger common setup

```python
from logging import INFO, Formatter, StreamHandler, getLogger

# Set up logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.getLevelName("INFO"),
    handlers=[logging.StreamHandler(sys.stdout)],
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

# Use like this
logger.warning(f"Invalid Character caught: {e} file: {path_pdf}")
```