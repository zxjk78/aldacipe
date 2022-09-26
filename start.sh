#!/bin/sh

#front end build
#rm -rf /home/ubuntu/deploy/
#mkdir /home/ubuntu/deploy
cd /home/ubuntu/deploy/frontend
sed -i 's/http:\/\/localhost:8080/https:\/\/j7a501.p.ssafy.io/g' ./src/api/http-config.ts
npm install
npm run build
cp -r build /home/ubuntu/build

#back end build
cd ../backend/MainServer/
echo here
pwd
sed -i 's/spring.datasource.username=a501/spring.datasource.username=ssafy/g' ./src/main/resources/application.properties
sed -i 's/spring.datasource.password\=local_aldacipe/spring.datasource.password\=59E9AB522A739D2A9A21/g' ./src/main/resources/application.properties

gradle clean 
gradle build -x test
ps -ef | grep MainServer*.jar | awk '{print $2}' | xargs kill -9 2>&1
cp ./build/libs/MainServer*T.jar /home/ubuntu/
cd /home/ubuntu
chmod +x *.jar
nohup java -jar *.jar & 2>&1

#nginx reload
sudo service nginx reload
