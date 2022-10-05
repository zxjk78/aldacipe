#!/bin/sh
sed -i 's/spring.datasource.username=a501/spring.datasource.username=ssafy/g' ./backend/MainServer/src/main/resources/application.properties
sed -i 's/spring.datasource.password\=local_aldacipe/spring.datasource.password\=59E9AB522A739D2A9A21/g' ./backend/MainServer/src/main/resources/application.properties

