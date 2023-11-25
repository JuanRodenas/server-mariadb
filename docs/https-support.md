## Introduction
<div align="center">
    <a href="https://github.com/JuanRodenas/server-mariadb">
        <img src="https://github.com/JuanRodenas/server-mariadb/blob/main/assets/Art/encryption-graphic.jpg" alt="server" width="100%">
    </a>
    <br>
</div>

These instructions will allow you to secure HTTP traffic from your standalone infrastructure, using a reverse proxy with `Nginx`.

#### Prerequisites

- Your standalone infrastructure is running with the [docker](./docker.md) configuration.
- You have downloaded the `nginx` files to your repository server.
- You have configured a domain name (or subdomain) to point to your server's IP address.

### Getting started

#### Configuring Nginx
First we download the readme files:
```bash
+--- conf.d
|   +--- standardnotes-files.conf
|   +--- standardnotes.conf
+--- mime.types
+--- nginx.conf
```

You can download the files again for nginx [files nginx](https://github.com/JuanRodenas/server-mariadb/tree/main/nginx)
```bash
wget https://github.com/JuanRodenas/server-mariadb/tree/main/nginx
```

We modify the server_name of the files:
`nginx/conf.d`
	+--- standardnotes-files.conf
	+--- standardnotes.conf

<aside>
💡 <strong>Informative note</strong>
<p>&nbsp;&nbsp;Replace <code>fqdn.example.org</code> or <code>fqdn1.example.org</code> with your actual domain
<p>&nbsp;&nbsp;Replace port <code>80 for the server</code> and <code>3125 for the files</code> you have specified in the docker compose, if you have changed it. Here the docker-compose snippet, changed to <code>81</code> and <code>8080</code>.
<pre><code class="lang-bash">
    ports:
      - 81:80
      - 8080:3125
</code></pre>
</aside>
1. Restart Nginx to apply changes

There may be different ways to restart Nginx. If you installed Nginx from Ubuntu's default repository just type:

```bash
docker compose down && docker compose rm && sleep 2 docker compose up -d
```

1. Test your `Nginx` configuration with:

```bash
docker exec -u root -t -i stand_nginx /bin/bash
nginx -t
```
<p>nginx useful command:</p>

- `nginx -s reload`: Reloads the nginx configuration without interrupting the service.
- `nginx -t`: Checks the nginx configuration syntax.
- `nginx -T`: Displays the current nginx configuration.

## Using your secured server
In order to use HTTPS on your standard note server, you have two options, use your standard notes server locally or use your standard notes server with a reverse proxy. I will explain both options.

### HTTPS on your standard note server locally
<details>
<summary>HTTPS on your standard note server locally</summary>

<Original>&nbsp;HTTPS on your standard note server locally:</Original>

### HTTPS on your standard note server locally
1. In order to use nginx and https locally, we must use the server ip and a certificate, I will explain with cerbot (lets encrypt).
	1.1 First we will use port 443 instead of port 80.
	```bash
	ports:
      - 443:443
      - 3125:3125
	```
	1.2 Then we will modify the server_name to be able to redirect to our local IP. Change the IP of the example to your server ip.
	
	- standardnotes.conf
	```bash
    server_name 127.0.0.1;
	```
	- standardnotes-files.conf
	```bash
    server_name 127.0.0.1;
	```
	If you use `server_name _;` it will send all the requests.
	1.3 We will add the ssl to be able to use the certificates that we will create:
	- We will modify the nginx file in the `conf.d` folder named `standardnotes.conf`. We replace the listen 80 by 443.
	```bash
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
	```
	- We will add the ssl configuration in the files in the `conf.d` folder to be able to use the certificates we will create in the next step.
	```bash
    # SSL Certificates
    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    ssl_session_cache shared:le_nginx_SSL:1m;
    ssl_session_timeout 1440m;
    ssl_session_tickets off;
    ssl_verify_client off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
	```
2. Setting up Certbot for HTTPS configuration:
Go to [certbot](https://certbot.eff.org/instructions) to get and install your HTTPS certificate. Certbot should automatically update your Nginx configuration and create SSL certificates for you. If you have not used cerbot, I have a tutorial in my adguard home repository to create a certificate with cerbot, in the following link:
<p><a href="https://github.com/JuanRodenas/Pihole_list#create-the-certificate-with-lets-encrypt"><img src="https://img.shields.io/badge/create the certificate with lets encrypt-blue.svg?style=flat" alt="letsencrypt"></a></p>

	2.1 Once the certificates have been created, we will proceed to send the files in the docker compose to the container as in the example:
	```bash
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /path/to/data/nginx:/etc/nginx
      - /path/to/data/certs:/etc/nginx/certs
	```
	
	<aside>
	💡 <strong>Informative note:</strong>
	<p>&nbsp;&nbsp;If you want to send the <code>lets encrypt</code> folder, change the <code>/path/to/data</code> to <code>/path/to/data</code>.</p>
	</aside>
</details>
&nbsp;

### HTTPS on your standard note server with a reverse proxy
<details>
<summary>HTTPS on your standard note server with a reverse proxy</summary>

<Original>&nbsp;HTTPS on your standard note server with a reverse proxy:</Original>

### HTTPS on your standard note server with a reverse proxy

1. We can install a reverse proxy, such as traefik. Traefik puede utilizar un proveedor ACME (como Let's Encrypt) para la generación automática de certificados. Creará el certificado e intentará renovarlo automáticamente 30 días antes de su vencimiento. Uno de los grandes beneficios de usar desafíos DNS es que nos permitirá usar certificados comodín; por otro lado, puede crear un riesgo de seguridad ya que requiere otorgar derechos a Traefik para crear y eliminar algunos registros DNS.
<p>You can install Traefik from the repository I have created for this purpose.</p>
<p><a href="https://github.com/JuanRodenas/selfhosted/tree/main/traefik"><img src="https://img.shields.io/badge/traefik-blue.svg?style=flat" alt="traefik"></a></p>

2. Then we will modify the server_name to be able to redirect to our local IP.

	**Example:**

	- standardnotes.conf
	```bash
    server_name fqdn.example.org;
	```
	- standardnotes-files.conf
	```bash
    server_name fqdn1.example.org;
	```
3. When the service is up, it will depend on the reverse proxy you have selected. If you have chosen Traefik, simply download the file from the repository called [docker-compose.traefik.yml](https://github.com/JuanRodenas/server-mariadb/blob/main/docker-compose.traefik.yml) and execute the following.
	```bash
	docker-compose -f docker-compose.yml -f docker-compose.traefik.yml up -d
	docker-compose logs -f
	```
After completing the above instructions, your Sync server should be HTTPS enabled!

</details>
&nbsp;

In the account menu, choose `Advanced Options` and enter the address of your new server in `Sync Server Domain`.

Then, register for a new account or log into an existing account and begin using your private new secure Standard Notes server!


## CloudFlare Missing Headers
When using CloudFlare in conjuction with Nginx you might encounter an issue about missing `Accept-Ranges` header which is required for file downloading. As a fix please add this to your Nginx configuration:

```shell
proxy_cache off;
```