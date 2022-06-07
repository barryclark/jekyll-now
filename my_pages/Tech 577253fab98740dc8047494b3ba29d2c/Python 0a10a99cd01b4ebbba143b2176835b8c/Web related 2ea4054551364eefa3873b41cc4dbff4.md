# Web related

# Deployment

## Gunicorn

- Act as a process manager, manage multiple worker process to leverage multi core CPU
- it starts 1 or more worker process
    - e.g. **Uvicorn** worker process class
- i.e. Gunicorn listen to the port & ip → pass the message to the worker process