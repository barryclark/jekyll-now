from github import Github
import sqlite3 as sql
import datetime
import csv
import sys
from lxml import html
import json
import yaml
import ConfigParser 

config=ConfigParser.RawConfigParser()
config.read('.github.cfg')

TOKEN=config.get('GitHub','TOKEN')
USER=config.get('GitHub','USER')
REPO_NAME=config.get('GitHub','REPO_NAME')
ORG=config.get('GitHub','ORG')

DBNAME="issuesDB.db"

CSVFILE=sys.argv[1]

wr=file(CSVFILE,"w+")
csvwriter=csv.writer(wr)

csvwriter.writerow(("id","updated_at","title","lat","lon","data"))

conn=sql.connect(DBNAME)
cur=conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS issues
       (id INTEGER NOT NULL PRIMARY KEY,
       updated_at TIMESTAMP,
       title TEXT,
       body TEXT);
       """)

conn.commit()

cur.execute("SELECT MAX(updated_at) FROM issues;")

res=cur.fetchone()[0]
if res is None:
    lastTime = datetime.datetime(2000,1,1)
else:
    lastTime = datetime.datetime.strptime(res,'%Y-%m-%d %H:%M:%S')

print "Getting issues newer than", lastTime

g = Github(USER, TOKEN)
org=g.get_organization(ORG)
r = org.get_repo(REPO_NAME)

issues=r.get_issues(since=lastTime)

for issue in issues:
    res = cur.execute("SELECT COUNT(*) FROM ISSUES WHERE id = ?",(issue.id,))
    count=res.fetchone()[0]
    if count == 0:
        print ("INSERT id %d" % (issue.id))
        cur.execute("INSERT INTO issues (id, updated_at, title, body) VALUES(?,?,?,?)", (issue.id, issue.updated_at, issue.title, issue.body))
    else:
        print ("UPDATE id %d" % (issue.id))
        cur.execute("UPDATE issues SET updated_at = ?, title = ?, body = ? WHERE id = ?", (issue.updated_at, issue.title, issue.body, issue.id))

conn.commit()

cur.execute("SELECT * FROM ISSUES ORDER BY updated_at;")

print "ISSUES IN DB"

for row in cur.fetchall():
        try:
            tree=html.fromstring(row[3])
            dataRaw=tree.xpath("//data/text()")
            dataStr=dataRaw[0] if len(dataRaw) > 0 else None

            yamldataRaw=tree.xpath("//yamldata/text()")
            yamldataStr=yamldataRaw[0] if len(yamldataRaw) > 0 else None
        except:
            dataStr = None
            yamldataStr = None


        title=row[2]
        if title is not None:
            title=title.encode('utf-8')

        if dataStr is not None:
            dataStr=dataStr.encode('utf-8')

        data=None
        lat=None
        lon=None

        if dataStr:
            try:
                data=json.loads(dataStr)
                lat=data['latitude']
                lon=data['longitude']
            except:
                pass


        if yamldataStr:
            try:
                data=yaml.load(yamldataStr)
                lat=data['latitude']
                lon=data['longitude']
            except:
                pass

        csvwriter.writerow((row[0],row[1],title,lat,lon,json.dumps(data)))


