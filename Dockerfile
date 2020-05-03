FROM openjdk:8-jdk-alpine
ADD target/microservicio01-0.0.1-SNAPSHOT.jar /microservicio01-0.0.1.jar
ENTRYPOINT ["java", "-jar", "microservicio01-0.0.1.jar"]

