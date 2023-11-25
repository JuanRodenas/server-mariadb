## configuration
<div align="center">
    <a href="https://github.com/JuanRodenas/server-mariadb">
        <img src="https://github.com/JuanRodenas/server-mariadb/blob/main/assets/Art/legal-graphic.jpg" alt="server" width="100%">
    </a>
    <br>
</div>

## Documentation to deploy with MariaDB:
<p>This would be the example of MariaDB</p>
<pre><code class="lang-bash">
db:
image: mariadb
container_name: db
restart: unless-stopped
command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
volumes:
  - /path/to/data/mysql:/var/lib/mysql
environment:
  MYSQL_ROOT_PASSWORD: ${PASSWORD_ROOT}
  MYSQL_DATABASE: ${DATABASE}
  MYSQL_USER: ${USERNAME}
  MYSQL_PASSWORD: ${PASSWORD}
</code></pre>

<p>The data to be configured are contained in the <code>.env</code> file created during installation. We will modify the following data:</p>
<pre><code class="lang-bash">
DB_USERNAME=std_notes_user
DB_PASSWORD=changeme123
DB_DATABASE=standard_notes_db
PASSWORD_ROOT=changeme_witch_superpassword
</code></pre>

<p>Change the password data and add a super secure password for <code>PASSWORD_ROOT</code>. Modify the database and user name to the one of your choice.</p>

<aside>
💡 Important: Do not add the .env file to the database, because it will not raise the container and will give error for the variables of another container.
</aside>

<p>In the <code>.env</code> file, indicate the port of MariaDB</p>
<pre><code class="lang-bash">
DB_HOST=db
DB_PORT=3306
</code></pre>
<p>Do not modify the database type: <code>DB_TYPE=mysql</code></p>

And to add the "Subscriptions on your self-hosted server" for MariaDB

### Authenticating the license in MariaDB
To authenticate the server, you must first have the account created and change the `EMAIL@ADDR` for the one of the subscription:

```sql
docker compose exec db sh -c "MYSQL_PWD=\$MYSQL_ROOT_PASSWORD mariadb \$MYSQL_DATABASE -e \
  'INSERT INTO user_roles (role_uuid , user_uuid) VALUES ((SELECT uuid FROM roles WHERE name=\"PRO_USER\" ORDER BY version DESC limit 1) ,(SELECT uuid FROM users WHERE email=\"EMAIL@ADDR\")) ON DUPLICATE KEY UPDATE role_uuid = VALUES(role_uuid);' \
"
```

```sql
docker compose exec db sh -c "MYSQL_PWD=\\$MYSQL_ROOT_PASSWORD mariadb \\$MYSQL_DATABASE -e \\
  'INSERT INTO user_subscriptions SET uuid=UUID(), plan_name=\\"PRO_PLAN\\", ends_at=8640000000000000, created_at=0, updated_at=0, user_uuid=(SELECT uuid FROM users WHERE email=\\"EMAIL@ADDR\\"), subscription_id=1, subscription_type=\\"regular\\";' \\
"
```

### Limiting Storage Quota

If you would like to limit the file upload quota for your user then make sure to run the following query on your database:

```sql
docker compose exec db sh -c "MYSQL_PWD=\$MYSQL_ROOT_PASSWORD mariadb \$MYSQL_DATABASE -e \
  'INSERT INTO subscription_settings(uuid, name, value, created_at, updated_at, user_subscription_uuid) VALUES (UUID(), "FILE_UPLOAD_BYTES_LIMIT", 10737418240, FLOOR(UNIX_TIMESTAMP(NOW(6))*1000000), FLOOR(UNIX_TIMESTAMP(NOW(6))*1000000), (SELECT us.uuid FROM user_subscriptions us INNER JOIN users u ON us.user_uuid=u.uuid WHERE u.email="EMAIL@ADDR"));' \
"
```

Note that this is setting the limit to 10GB (10737418240 bytes) for user with email `EMAIL@ADDR`

## Files Server URL
In order to upload files you have to have an active subscription for your user. Read the [subscriptions page](https://standardnotes.com/help/48/can-i-use-extensions-with-a-self-hosted-server) on instructions how to setup a subscription for yourself. In your `.env` file the environment variable `PUBLIC_FILES_SERVER_URL` has to be set to a publicly accessible url. The reason for that is that the clients are accessing the Files Server directly instead of via Api Gateway. Remember that if you are hosting your standalone instance on an external server then `localhost` is not the host that properly describes where the files server resides.

- Add in the .env configuration

`PUBLIC_FILES_SERVER_URL=`

<aside>
💡 Note: I have encountered a number of people who are lost and have given up on installing standardnotes because they are not clear on how to install it.
</aside>


## Emphasize the importance of creating 3 "different" keys in these sections with the following command:
*Create the password with: openssl rand -hex 32*

```
AUTH_SERVER_ENCRYPTION_SERVER_KEY=
AUTH_JWT_SECRET=
VALET_TOKEN_SECRET=
```

<aside>
💡 Note: I noticed that if you don't set them different, the files get corrupted when uploading.
</aside>