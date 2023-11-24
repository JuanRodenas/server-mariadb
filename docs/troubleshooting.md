### Upload directory write permissions

The default upload directory is located inside the standalone folder under `data/uploads`. Depending on the running OS, you might encounter write permissions to that folder by the application. In that case the following commands might help:

```bash
chmod -R 775 data && \
mkdir -p data/uploads && \
sudo chmod -R 755 data/uploads && \
sudo chown -R 1001.1001 data/uploads
```

### CREAR BACKUPS DE TU CUENTA.

En Backups/Data backups
Creamos un backups
Si queremos recuperar el backup, extraemos el `.zip` y después seleccionamos el archivo: `Standard Notes Backup and Import File` y pulsamos Importar backup.