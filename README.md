# SE65-Senior-project
CAMT SE65 `senior project` for my group

Members:

      652115001 Karanthaphong Areerak​
      652115002 Krittayot Khueanchan​
      652115013 Narongchai Rongthong​
      652115030 Phiriya Promkaewma

---

<details>
<summary>Starting MySQL on Docker</summary>

## Steps to Start MySQL on Docker

### 1. Pull the MySQL Docker Image

```bash
docker pull mysql:latest
```

### 2. Create a Docker Network (Optional but recommended)

To make it easier for containers to communicate with each other, create a network:

```bash
docker network create mysql-network
```

This will create a network named `mysql-network` that you can use to link containers.

### 3. Start MySQL Container

Run the MySQL container with the following command:

```bash
docker run --name mysql-container --network mysql-network -e MYSQL_ROOT_PASSWORD=root_password -p 3306:3306 -d mysql:latest
```

- `--name mysql-container` gives the container a name (you can choose any name).
- `--network mysql-network` connects the MySQL container to the `mysql-network`.
- `-e MYSQL_ROOT_PASSWORD=root_password` sets the root password for MySQL. Replace `root_password` with your preferred password.
- `-p 3306:3306` maps the container's port `3306` (MySQL default port) to your local machine's `3306` port.
- `-d mysql:latest` runs MySQL in detached mode using the latest MySQL image.

### 4. Check if the MySQL Container is Running

Run:

```bash
docker ps
```

This should show you the MySQL container running.

### 5. Connect to the MySQL Database from Your App

In your code, you can now connect to the MySQL server using `127.0.0.1` (or `localhost`) and the root password you set:

```ts
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root_password',  // The password you set in the docker command
  database: 'my_database'
});
```

### 6. To Access MySQL Command Line

You can access the MySQL command line interface inside the container:

```bash
docker exec -it mysql-container mysql -u root -p
```

Enter your root password when prompted.

### 7. Stopping MySQL Container

If you need to stop the container, use:

```bash
docker stop mysql-container
```

To restart it:

```bash
docker start mysql-container
```

### 8. Removing the Container

If you want to remove the container (and all its data):

```bash
docker rm -f mysql-container
```

---

### 9. Set Up phpMyAdmin for MySQL Access via Web Interface

To manage your MySQL container via a web interface, you can use **phpMyAdmin**.

#### Step 1: Pull the phpMyAdmin Docker Image

```bash
docker pull phpmyadmin/phpmyadmin
```

#### Step 2: Start phpMyAdmin Container

Run the phpMyAdmin container and link it to the MySQL container on the same network:

```bash
docker run --name phpmyadmin --network mysql-network -p 9000:80 -d phpmyadmin/phpmyadmin
```

- `--name phpmyadmin` gives the container a name (you can choose any name).
- `--network mysql-network` connects the phpMyAdmin container to the same `mysql-network` created earlier.
- `-p 9000:80` maps the container's port `80` (phpMyAdmin default port) to your local machine's port `9000`.
- `-d phpmyadmin/phpmyadmin` runs phpMyAdmin in detached mode.

#### Step 3: Access phpMyAdmin

Once the phpMyAdmin container is running, you can access it via your browser at:

```
http://localhost:9000
```

- Use `root` as the username and the root password you set when running the MySQL container for logging in.

</details>

---