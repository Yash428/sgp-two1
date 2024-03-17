from node:latest
copy . /home/server

workdir /home/server/

run npm install

expose 8002

cmd ["npm", "run", "dev"]