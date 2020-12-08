FROM node:14.15.1

# Setup new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer
RUN mkdir jsadsl 

COPY --chown=developer:developer . ./jsadsl

RUN cd jsadsl

RUN npm install
