FROM ubuntu:18.04

RUN apt update \
    && apt install wget -y \
    && apt install openjdk-8-jdk -y

COPY * /install/
RUN chmod +x -R /install \
    && /install/node.sh
ENV PATH=/opt/node-v10.15.0-linux-x64/bin:$PATH

RUN npm install -g cordova@8.1.1 \
    && npm install -g ionic@4.12.0
