FROM node:14.15.1

# Setup new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer/jsadsl

COPY --chown=developer:developer . .
