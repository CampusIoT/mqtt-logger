# Using mqtt-logger with TTN

* https://www.thethingsnetwork.org/docs/applications/mqtt/quick-start.html
> Warning
>> * The AppID is not the AppEUI but the symbolic name
>> * The AppKey should start by ttn-account-v2.

## Build and Run

Edit the settings.TTN.json for adding your credential (ie AppID for the username and AppKey for password)

```bash
wget https://console.thethingsnetwork.org/mqtt-ca.pem
./build.sh
docker run -ti --name mqtt-logger campusiot/mqtt-logger:latest
```
