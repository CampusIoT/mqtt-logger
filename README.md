mqtt-logger
===========

Log the messages published on a MQTT topic into a local file

## Configure

Edit the settings.json configuration file.

## Run

    docker run -ti --name mqtt-logger campusiot/mqtt-logger:latest

    docker exec -it mqtt-logger /usr/bin/tail -f /data/msg.log

    mosquitto_pub -h test.mosquitto.org -t campusiot/test \
      -m '{"deveui":"0123456789abcdef","temperature":25.6,"batteryLevel":95}'

## Running with persistence

### Local directories / External Configuration

Alternatively you can use volumes to make the changes
persistent and change the configuration.

    mkdir -p ~/configuration/mqtt-logger/
    mkdir -p ~/data/mqtt-logger/

    # For TESTING purposes you can use chmod -R 777 ~/data/mqtt-logger/*
    # Better use "-u" with a valid user id on your docker host

    docker run -ti \
    -v ~/configuration/mqtt-logger/settings.json:/usr/src/app/settings.json:ro \
    -v ~/data/mqtt-logger/:/data/ \
    --name mqtt-logger campusiot/mqtt-logger:latest

Volumes: /data, /usr/src/app/settings.json

### Docker Volumes for persistence

Using [Docker Volumes](https://docs.docker.com/engine/userguide/containers/dockervolumes/) for persistence.

Create a named volume:

    docker volume create --name mqtt_logger_data

Now it can be attached to docker by using `-v mqtt_logger_data:/data` in the
Example above. Be aware that the permissions within the volumes
are most likely too restrictive.

## Running with Docker Compose

    mkdir -p ~/configuration/mqtt-logger/
    mkdir -p ~/data/mqtt-logger/
    cp ./settings.json ~/configuration/mqtt-logger/
    docker-compose -f docker-compose.yml up

    docker exec -it mqtt-logger_mqtt-logger_1 /usr/bin/tail -f /data/msg.log
    
    mosquitto_pub -h test.mosquitto.org -t campusiot/test \
      -m '{"deveui":"0123456789abcdef","temperature":25.6,"batteryLevel":95}'

## Build

    git clone https://github.com/campusiot/mqtt-logger.git
    cd mqtt-logger
    docker build -f Dockerfile -t campusiot/mqtt-logger:latest .

    # For saving the container image
    mkdir -p ~/docker-images
    docker save campusiot/mqtt-logger:latest | gzip > ~/docker-images/mqtt-logger.tgz

    # For loading the saved container image
    gunzip -c ~/docker-images/mqtt-logger.tgz | docker load

## Authors and license

mqtt-logger was written by:

* **Didier Donsez** | [GitHub](https://github.com/donsez/)
* With contributions from:
 * [Vivien Quéma](https://github.com/quema)

License: [EPLv2](https://www.eclipse.org/legal/epl-2.0/)

## Contact

Contact: Didier Donsez

## Bonus track
* https://github.com/nicolsc/sigfox-callback-demo
* https://www.thethingsnetwork.org/docs/applications/mqtt/quick-start.html
