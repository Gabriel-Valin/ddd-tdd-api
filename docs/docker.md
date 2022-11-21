- create a Dockerfile image of application
- create a docker-compose.yaml file to build your stack (app, mysql, redis, etc..)
- docker-compose.yaml:
```
app:
    container_name: crud-api
    
    # build . is able to use Dockerfile in root dir
    build: .

    # wait mysql service is ready to run
    depends_on:
      - mysql_database

    # expose utils ports
    ports:
      - "3013:3013"
      - "5555:5555"
    
    # bind volume to hot-reload (root -> WORKDIR)
    volumes:
      - .:/vln/app
    
    # bridge network to communication 
    networks:
      - mysql-adminer-network
```

## Important
- Generate prisma client and run migrate before docker-compose up