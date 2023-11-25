## troubleshooting
<div align="center">
    <a href="https://github.com/JuanRodenas/server-mariadb">
        <img src="https://github.com/JuanRodenas/server-mariadb/blob/main/assets/Art/journalist-graphic.jpg" alt="server" width="100%">
    </a>
    <br>
</div>

### Upload directory write permissions
The default upload directory is located inside the standalone folder under `data/uploads`. Depending on the running OS, you might encounter write permissions to that folder by the application. In that case the following commands might help:

```bash
chmod -R 775 data && \
mkdir -p data/uploads && \
sudo chmod -R 755 data/uploads && \
sudo chown -R 1001.1001 data/uploads
```

### CREATE BACKUPS OF YOUR ACCOUNT.
- In `Backups/Data backups`
- Create a backup
- If we want to recover the backup, extract the `.zip` and then select the file: `Standard Notes Backup and Import File` and click on Import backup.


**Frequently Asked Questions**

- What if I don't have 2 GB of memory?

If your machine does not have 2 GB of memory, the infrastructure may not work properly. In this case, you can try to reduce the number of containers running at the same time.

- What if I don't have a domain name?

If you do not have a domain name, you can access the infrastructure through its local IP address. To do this, open your web browser and type the IP address of your server in the address bar.

- What if I have not configured my security groups?

If you have not configured your security groups, you may not be able to access the infrastructure. In this case, please refer to your hosting provider's documentation for instructions on how to set up security groups.