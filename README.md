# Server applications using Docker compose and MariaDB

## Requirements

Can I self-host Standard Notes?

*Yes! Self-hosting both the app and server is possible and relatively simple.*
There are two components to the self-hosted infrastructure:
#### Standard Notes Backend Infrastructure

The first is the backend infrastructure. The backend is zero-knowledge, which means it does not understand the contents of what it is storing. Any user content received by the server is always encrypted by the client beforehand.

The server is responsible for authentication and syncing. When you self-host your own server, the end result will be an endpoint that you expose via HTTPS. You enter this endpoint in the Standard Notes client applications in the Custom sync server field (found under Advanced options when signing in or registering).
Get started with self-hosting your own Standard Notes server:

- Deploying a private Standard Notes server using [Docker](#Get-Started-using-Docker)

#### Self-hosting Standard Notes client applications

Because the client applications (desktop, web, and mobile) allow the option of specifying which server to connect to, self-hosting the client applications is not as common as self-hosting the server. If you were to go down this route, the paths you might take are:

- Self hosting the Standard Notes web app (app.standardnotes.com) on your own server so that you do not rely on our own instance for portable usage.
- Compiling the desktop and mobile apps from source to achieve maximum configurability or peace of mind.

To get started with self-hosting our client applications, visit our app code repository.

Our self-hosted server infrastructure consists of several different microservices that are responsible for different sets of functionality. Our self-hosted server is only intended as the backend that processes and stores your data; it does not include self-hosting the web application, which is an optional process that must be done separately. You will be able to use our existing [web](https://app.standardnotes.com) and desktop app with your self-hosted server.

## Get Started using Docker

👉 **[Using our automated docker-compose setup with accompanying scripts](./docker.md)** 👈

If you'd like to learn more about each of the particular services, head over to [Infrastructure Overview](./infrastructure-overview.md).

> **Note** Our setup also provides a running MySQL database and a Redis cache node. You do not have to provision these services on your own. For users that have been self-hosting a legacy version of our server, we've prepared a [Migrating from Legacy guide](./legacy-migration.md).

### Recommendations

We highly recommend you use our Docker setup to host your syncing server. Docker containers are isolated software environments that you can control and manage.

If you are new to Docker, please see the [official Docker documentation](https://docs.docker.com/get-started) on how to get started. Ensure you [install Docker-Compose](https://docs.docker.com/compose/install/) following the documentation. Your Linux distribution may not have the most up to date docker-compose and will fail to load.

We recommend avoiding setting up your syncing server from scratch with Nginx unless you are proficient with Nginx. Setting up the full architecture can be challenging without full knowledge of how the syncing server and its microservices function.

## Web application
If you would like to self-host the actual Standard Notes web application, visit the repository for the web app on GitHub:
<a href="https://github.com/standardnotes/web"><img src="https://img.shields.io/badge/Repository for the web app on GitHub-blue.svg?style=flat" alt="Repository for the web app on GitHub"></a>

## HELP ME AND CONTRIBUTION 🙌
<p> &nbsp;If you have any problems with the operation of Standard Notes, please, open a <code>issue</code> here:</p>
<a href="https://github.com/standardnotes/server/issues"><img src="https://img.shields.io/badge/issues standardnotes-green.svg?style=flat" alt="Link"></a>

<p> &nbsp;If you want to contribute to improve the installation configuration with MariaDB, open a <code>issue</code> here:</p>
<a href="https://github.com/JuanRodenas/server-mariadb/issues"><img src="https://img.shields.io/badge/issues on repository-green.svg?style=flat" alt="Link"></a>

## Credits 🚀
This repository is made with all my love and affection.

[![GitHub](https://img.shields.io/badge/-JuanRodenas-171515?style=flat&logo=Github&logoColor=black&labelColor=ececec&color=ececec)](https://github.com/JuanRodenas/)

## 🎉 ¡Ready!
&nbsp;

<p><sup>These files/texts are provided "AS IS", without warranties of any kind, express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claims, damages or other liability arising out of or relating to the files or the use thereof.</sup></p>
<p><sub>Any and all trademarks are the property of their respective owners.</sub></p>