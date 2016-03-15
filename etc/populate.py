#!/usr/bin/python3

import itertools
import sqlite3

connection = sqlite3.connect('./main.db')
cursor = connection.cursor()
cursor.execute('drop table main')
cursor.execute('create table main(id integer primary key, url text)')

fmts = (
    'https://homes.di.unimi.it/~belletc/down1.php?FILENAME=PS2013-{:02}.mp4',
    'https://homes.di.unimi.it/~belletc/down1.php?FILENAME=PS2013-{:02}B.mp4',
)

for n in range(1, 19 +1):
    for url_fmt in fmts:
        url = url_fmt.format(n)
        cursor.execute('insert into main(url) values ("{}")'.format(url))

connection.commit()
connection.close()
