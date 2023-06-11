FROM openjdk:17-jdk-alpine

ADD target/subscription-manager-api.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]