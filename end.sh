#!/bin/sh
# ps -ef|grep SNAPSHOT.jar
# sudo kill -9 `ps -ef|grep SNAPSHOT.jar|awk '{print $2}'` > /dev/null 2>&1 &
# cd /home/ubuntu/deploy/libs
# sudo /usr/bin/nohup /usr/bin/java -jar *SNAPSHOT.jar  > /dev/null 2>&1 &
# ps -ef|grep SNAPSHOT.jar
sudo service nginx status
sudo service nginx reload