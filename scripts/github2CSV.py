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


conn=sql.connect(DBNAME)
cur=conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS issues
       (id INTEGER NOT NULL PRIMARY KEY,
       updated_at TIMESTAMP,
       title TEXT,
       labels TEXT,
       body TEXT,
       url TEXT);
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
    labels = json.dumps([l.name for l in issue.labels])
    res = cur.execute("SELECT COUNT(*) FROM ISSUES WHERE id = ?",(issue.id,))
    count=res.fetchone()[0]
    if count == 0:
        print ("INSERT id %d" % (issue.id))
        cur.execute("INSERT INTO issues (id, updated_at, title, labels, body, url) VALUES(?,?,?,?,?,?)", (issue.id, issue.updated_at, issue.title, labels, issue.body,issue.html_url))
    else:
        print ("UPDATE id %d" % (issue.id))
        cur.execute("UPDATE issues SET updated_at = ?, title = ?, labels = ?, body = ?, url = ? WHERE id = ?", (issue.updated_at, issue.title, labels, issue.body, issue.html_url, issue.id))

conn.commit()

cur.execute("SELECT id, updated_at, title, labels, body, url FROM ISSUES ORDER BY updated_at;")
csvwriter.writerow(("url","id","updated_at","title","labels","lat","lon","data","body"))

for row in cur.fetchall():
        try:
            tree=html.fromstring(row[4])
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

        labels=row[3]
        if labels is not None:
            labels=labels.encode('utf-8')

        if dataStr is not None:
            dataStr=dataStr.encode('utf-8')

        data=None
        lat=None
        lon=None

        if dataStr:
            try:
                data=json.loads(dataStr)
                if data.has_key("latitude"):
                    lat=data['latitude']
                elif data.has_key("lat"):
                    lat=data['lat']

                if data.has_key("longitude"):
                    lon=data['longitude']
                elif data.has_key("lon"):
                    lon=data['lon']
            except:
                pass


        if yamldataStr:
            try:
                data=yaml.load(yamldataStr)
                if data.has_key("latitude"):
                    lat=data['latitude']
                elif data.has_key("lat"):
                    lat=data['lat']

                if data.has_key("longitude"):
                    lon=data['longitude']
                elif data.has_key("lon"):
                    lon=data['lon']
            except:
                pass

        csvwriter.writerow((row[5],row[0],row[1],title,lat,lon,labels,json.dumps(data),row[4].encode('utf-8')))

