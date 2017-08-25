import pandas as pd
import sys

dd=pd.read_json(sys.argv[1])
alloggi=[d for d in dd['issue'] if 'Alloggi' in d['labels']]
emailalloggi=[(aa['url'],aa['title'],aa['data']['email']) for aa in alloggi if aa['data'].has_key('email') and aa['data']['email'] is not None and len(aa['data']['email']) > 0]
ea=pd.DataFrame(emailalloggi)
ea.to_csv('emailalloggi.csv', encoding='utf-8')

