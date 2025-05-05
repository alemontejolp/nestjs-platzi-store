# FROM node:18.17.0-alpine3.18
FROM node:22-alpine

# ARG HOST_USER=someuser
# ARG HOST_USER=node

# RUN useradd ${HOST_USER} -G ${HOST_USER}
# RUN addgroup -S ${HOST_USER} && adduser -S ${HOST_USER} -G ${HOST_USER}

# RUN echo "${HOST_USER} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN apk add openssh-keygen tzdata alpine-conf
# RUN set -ex && apk --no-cache add sudo

ENV TZ=America/Cancun

RUN setup-timezone -z America/Cancun

RUN mkdir /home/app

WORKDIR /home/app

# USER ${HOST_USER}

EXPOSE 3000

CMD ["sh", "-c", "./start.sh"]
