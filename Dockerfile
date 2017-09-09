FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

# Add labels
ARG GIT_COMMIT=unknown
LABEL jz17demo.git.commitHash=$GIT_COMMIT

CMD [ "npm", "start" ]
EXPOSE 3000
