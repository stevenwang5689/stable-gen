To build `stable-gen` static website on solo-group.link: 

export NODE_OPTIONS=--openssl-legacy-provider
npm run build

then copy build/ to /var/www/stablegen/

then possibly:
chown -R caddy:caddy /var/www/stablegen/


Note that is it managed by Caddy controlled in /etc/caddy/Caddyfile