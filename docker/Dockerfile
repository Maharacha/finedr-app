FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-8-jdk

RUN wget https://nodejs.org/download/release/v10.15.0/node-v10.15.0-linux-x64.tar.gz \
    && tar -xzf node-v10.15.0-linux-x64.tar.gz -C /opt/
ENV PATH=/opt/node-v10.15.0-linux-x64/bin:$PATH

RUN npm install -g cordova@8.1.1 \
    && npm install -g ionic@4.12.0

RUN wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip \
    && unzip sdk-tools-linux-3859397.zip -d /opt/android-sdk/
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools/bin
ENV PATH=$PATH:$ANDROID_HOME/platform-tools
RUN yes | sdkmanager --licenses \
    && sdkmanager "build-tools;28.0.3" \
    && sdkmanager "platform-tools" "platforms;android-28" \
    && sdkmanager --update
RUN apt-get install lib32ncurses5 lib32stdc++6 -y

RUN apt-get install -y \
    curl \
    zip
RUN curl -s "https://get.sdkman.io" | bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN source "/root/.sdkman/bin/sdkman-init.sh" && sdk install gradle 5.1.1
