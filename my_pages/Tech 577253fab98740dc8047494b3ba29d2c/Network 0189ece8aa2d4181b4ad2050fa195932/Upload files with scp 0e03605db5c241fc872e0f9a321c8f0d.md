# Upload files with scp

## Case: with jump host

After you setup the tunnel (with command such as `ssh -L 1234:C:22 username@destination` )

```python
scp -P 1234 -pr prj/ keith@localhost:/some/path
```