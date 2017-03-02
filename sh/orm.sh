#!/bin/sh
. ./sh/env.sh

sequelize-auto -o $output -d $db -h $host -u $user -p $port -x $password -e mysql

# sequelize-auto -o "./schema" -d koa -h 127.0.0.1 -u root -p 3306 -x root -e mysql
