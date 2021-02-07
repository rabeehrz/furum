# Furum

Furum is a Google Forms clone project create as part of TinkerHubs HireHack.

## Steps to run

### Server

- cd into the server folder.
- rename `.env.sample` to `.env` and configure to your needs
- run `docker-compose up`
- once container is up, `yarn dev`

### Frontend client

- Find and replace all `rabeeh.me:3000` links to `localhost:3000`(sorry, didn't have time to add a base URL. Forgot to create an axios instance)

- `yarn dev`
