FROM node:8-onbuild
EXPOSE 3000

# Add labels
ARG GIT_COMMIT=unknown
LABEL jz17demo.git.commitHash=$GIT_COMMIT
