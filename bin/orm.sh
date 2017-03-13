#!/bin/sh
. ./sh/env.sh

sequelize-auto -o $output -d $db -h $host -u $user -p $port -x $password -e mysql
