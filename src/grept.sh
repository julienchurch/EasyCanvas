#!/usr/bin/env bash
for file in ./*.js
do
    echo $file
    cat $file | grep -i "timeout"
done
