## Requirements
<div align="center">
    <a href="https://github.com/JuanRodenas/server-mariadb">
        <img src="https://github.com/JuanRodenas/server-mariadb/blob/main/assets/Art/cyborg-factory.jpg" alt="server" width="100%">
    </a>
    <br>
</div>

**Instructions for setting up a Standard Notes infrastructure with Docker on a Linux server**.

These instructions are based on the following assumptions:

- The machine you are going to run the infrastructure on has at least 2 GB of memory.
- Set up a Linux server (Ubuntu 20.04 64-bit or later).
- Install Docker and Docker Compose on it.
	- For more information on how to configure Docker and Docker Compose, please refer to the official documentation [Docker](https://docs.docker.com/engine/install/ubuntu/#set-up-the-repository).
- You have configured your security groups to allow incoming TCP connections on ports 80 and 443 from at least your local IP.
- You have configured a domain name (or subdomain) to point to your server's IP address.
-  For more information on how to set up security groups on your server, see your hosting provider's documentation. If you want to run it as a non-root user, remember the post-installation steps for Linux: [link](https://docs.docker.com/engine/install/linux-postinstall#manage-docker-as-a-non-root-user)


## Step By Step
 
1. Create a `folder` where you want to store your working files. We will refer to this folder as your working directory.
<pre>&ensp;<code class="lang-bash">
mkdir standardnotes && \
cd standardnotes
</code></pre>

2. Create a `.env` file in your working directory. Then copy our example values to your file:
<p>&ensp;<a href="https://raw.githubusercontent.com/JuanRodenas/server-mariadb/main/.env.sample?raw=true"><img src="https://img.shields.io/badge/Download-.env-ffbf00.svg?style=flat&logo=download" alt="Download"></a></p>
<pre>&ensp;<code class="lang-bash">
touch .env && \
curl https://raw.githubusercontent.com/JuanRodenas/server-mariadb/main/.env.sample -o .env
</code></pre>

3. Copy the [LocalStack bootstrap script](https://github.com/standardnotes/server/blob/main/docker/localstack_bootstrap.sh) and place it in your working directory. Ensure the file has executable permissions:
<p>&ensp;<a href="https://github.com/standardnotes/server/blob/main/docker/localstack_bootstrap.sh?raw=true"><img src="https://img.shields.io/badge/Download-localstack_bootstrap.sh-ffbf00.svg?style=flat&logo=download" alt="Download"></a></p>
<pre>&ensp;<code class="lang-bash">
curl https://raw.githubusercontent.com/standardnotes/server/main/docker/localstack_bootstrap.sh -o localstack_bootstrap.sh
chmod +x localstack_bootstrap.sh
</code></pre>

4. Copy the `docker-compose.yml` working folder:
<p>&ensp;<a href="https://raw.githubusercontent.com/JuanRodenas/server-mariadb/main/docker-compose.yml?raw=true"><img src="https://img.shields.io/badge/Download-docker_compose.yml-ffbf00.svg?style=flat&logo=download" alt="Download"></a></p>
<pre>&ensp;<code class="lang-bash">
curl https://raw.githubusercontent.com/JuanRodenas/server-mariadb/main/docker-compose.yml -o docker-compose.yml
</code></pre>

5. Download the files for nginx:
<p>&ensp;<a href="https://github.com/JuanRodenas/server-mariadb/raw/main/nginx.zip?raw=true"><img src="https://img.shields.io/badge/Download-nginx.zip-ffbf00.svg?style=flat&logo=download" alt="Download"></a></p>
<pre>&ensp;<code class="lang-bash">
wget https://github.com/JuanRodenas/server-mariadb/raw/main/nginx.zip && unzip nginx.zip
</code></pre>

## Configuration .env and docker-compose.yml

1. Change the database password:
	- Edit the DB data in the `.env` file.
	- In order to configure the .env file, please refer to the configuration readme. <a href="./configuration.md"><img src="https://img.shields.io/badge/configuration-blue.svg?style=flat" alt="configuration"></a>
2. Configure the nginx files from the https readme: <a href="./https-support.md"><img src="https://img.shields.io/badge/https support-blue.svg?style=flat" alt="nginx"></a>
3. Configure the database files and uploads file from the readme: <a href="./configuration.md"><img src="https://img.shields.io/badge/configuration-blue.svg?style=flat" alt="configuration"></a>
4. In order to solve the problems you can check the readme: <a href="./troubleshooting.md"><img src="https://img.shields.io/badge/troubleshooting-blue.svg?style=flat" alt="troubleshooting"></a>

## Configure nginx with reverse proxy
<p>To configure nginx with reverse proxy, please refer to the following readme:</p>
<p><a href="./https-support.md#https-on-your-standard-note-server-with-a-reverse-proxy"><img src="https://img.shields.io/badge/https_support-ffbf00.svg?style=flat" alt="nginx"></a></p>
