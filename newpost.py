#!/usr/local/bin/python3.7

import argparse
from os import listdir, mkdir
from os.path import isfile, join
import datetime
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('indir', type=str, help='path to new exports')

args = parser.parse_args()

workpath = "/Users/russelllangton/src/russlangton.github.io/"
newpath = "/Users/russelllangton/Pictures/lightroom_exports/" + args.indir


files = [f for f in listdir(newpath)]

print(files)

now = datetime.date.today()

postname =  str(now) + "-" + args.indir + ".md"

imagespath = workpath + "images/" + args.indir
mkdir(imagespath)


content = """
---
layout: post
title: {args.indir}
---

date

"""

postpath = workpath + "_posts/" + postname
f = open(postpath, "w")
f.write(content)

for image in files:

	subprocess.run(["cp", newpath + "/" + image, imagespath])
	subprocess.run(["git", "add", imagespath + "/" + image])

	imageref = "![_config.yml]({{{{ site.baseurl }}}}/images/{args.indir}/{image})\n\n"
	f.write(imageref)

f.close()

subprocess.run(["git", "add", postpath])
