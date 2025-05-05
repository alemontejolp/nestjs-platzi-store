#!/bin/sh

RED_COLOR='\033[0;31m'
NO_COLOR='\033[0m'

npm ci

# chmod 777 node_modules

# npm run init

if [ $? -ne 0 ]
then
  printf "${RED_COLOR}Initialization process failed. Refusing to start the application.\n"
  exit 1
fi

npm run start:dev
