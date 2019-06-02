# Install packages
- sudo apt-get update
### Install PHP
- sudo apt-get install php
### Install GIT
- sudo apt-get install git
### Install composer
- sudo apt-get install composer
### Install PHP packages
- sudo apt-get install php7.*-xml

- sudo apt-get install php7.*-zip
### Install server
- cd directory_project

- clone repository

- cd awesomenewssiteever

- Get permission on directory
 
- composer install
### Setting Apache
- cd /etc/apache2/

- sudo nano apache2.conf

- Add on the file:
````
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
SetEnvIf Content-Type "(.*)" HTTP_CONTENT_TYPE=$1
SetEnvIf Accept "(.*)" HTTP_ACCEPT=$1
````
- cd sites-available/

- sudo nano "config".conf

- Add on the file:
````
<VirtualHost *:"port">

ServerAdmin "admin"
DocumentRoot directory/to/project/public

ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
````
- sudo ln -s /etc/apache2/sites-available/"config".conf /etc/apache2/sites-enabled/"config".conf

- sudo systemctl restart apache2
### Setting DATABASE for Authorization and Registration
- cd directory_project/awesomenewssiteever/

- sudo nano .env

- Change 
```
DATABASE_URL= "yours database"
```

