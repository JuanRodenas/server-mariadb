### Introduction

These instructions will enable you to secure HTTP traffic of your standalone infrastructure, using a reverse proxy with `Nginx`.

#### Pre-requisites

- Your standalone infrastructure is running on our [docker](./docker.md) setup
- You've installed `nginx` in your server.
- You've configured a domain name (or subdomain) to point to your server's IP address.

### Getting started

#### Setting up Nginx

1. Disable the default virtual host:

  ```bash
  unlink /etc/nginx/sites-enabled/default
  ```

1. Create a new file named `standardnotes.conf` within `/etc/nginx/sites-available`:

  ```shell
  server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;

    access_log /var/log/nginx/standardnotes-access.log;
    error_log /var/log/nginx/standardnotes-error.log;

    client_max_body_size 50M;

    location / {
      proxy_pass http://127.0.0.1:3000;
    }
  }
  ```


<blockquote>
💡 <strong>Informative note</strong>
<p>&nbsp;&nbsp;Replace <code>yourdomain.com</code> with your actual domain and <code>3000</code> with the port you have specified as <code>{EXPOSED_PORT}</code> if you have changed it.</p>
</blockquote>

1. Enable your new site:

  ```bash
  ln -s /etc/nginx/sites-available/standardnotes.conf /etc/nginx/sites-enabled/standardnotes.conf
  ```

1. Restart Nginx to apply changes

  There may be different ways to restart Nginx. If you installed Nginx from Ubuntu's default repository just type:

  ```bash
  $ sudo service nginx restart
  ```

1. Test your `Nginx` configuration with:

  ```bash
  $ nginx -t
  ```

1. Setting up Certbot for HTTPS configuration

  Go to [certbot](https://certbot.eff.org/instructions) to get and install your HTTPS certificate.

  Certbot should automatically update your Nginx configuration and create SSL certificates for you.

  After completing the above instructions, your Sync server should be HTTPS enabled!

## Using your secured server

In the account menu, choose `Advanced Options` and enter the address of your new server in `Sync Server Domain`.

Then, register for a new account or log into an existing account and begin using your private new secure Standard Notes server!

### CloudFlare Missing Headers

When using CloudFlare in conjuction with Nginx you might encounter an issue about missing `Accept-Ranges` header which is required for file downloading. As a fix please add this to your Nginx configuration:

```shell
proxy_cache off;
```