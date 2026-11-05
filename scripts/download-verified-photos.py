#!/usr/bin/env python3
"""Fetch only manually verified Commons titles; Python stdlib. Run when internet is available."""
import csv,json,pathlib,urllib.parse,urllib.request,imghdr,time
ROOT=pathlib.Path(__file__).resolve().parents[1]
images=json.loads((ROOT/'data/verifiedPhotoManifest.json').read_text(encoding='utf-8'))
out=ROOT/'public/assets/images/verified';out.mkdir(parents=True,exist_ok=True)
rows=[]
for item in images:
    filename=item['slot']+'.jpg'
    url='https://commons.wikimedia.org/wiki/Special:FilePath/'+urllib.parse.quote(item['file'])+'?width=1200'
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'WayEchoStudentPhotoAudit/1.1 (educational prototype)'})
        with urllib.request.urlopen(req,timeout=25) as resp: data=resp.read()
        if len(data)<10000 or imghdr.what(None,data)!='jpeg': raise ValueError('File does not contain a valid JPEG')
        (out/filename).write_bytes(data)
        rows.append([filename,item['description'],item['author'],item['license'],item['source']]); print('OK',filename)
    except Exception as exc:
        print('FAILED',filename,str(exc),'-- existing remote image in UI left unchanged')
    time.sleep(.4)
with (out/'CREDITS.csv').open('w',newline='',encoding='utf-8-sig') as f:
    wr=csv.writer(f);wr.writerow(['file','subject','author','license','source']);wr.writerows(rows)
