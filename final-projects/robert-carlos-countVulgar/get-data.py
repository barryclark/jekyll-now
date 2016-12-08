import billboard
import json
import urllib
from urllib.parse import quote

apikey = 'APIKEY'

# make the empty dictionary
songs = {}

# loop through the years we're interested in
for x in range(1960, 2016):
    # another dictionary inside
    songs[x] = {}
    # get the chart for the last week of that year
    chart = billboard.ChartData('hot-100', '%s-12-19' % str(x)) 
    # for every song on the chart, keep its rank, title, and author
    for song in chart:
        songs[x][song.rank] = {}
        songs[x][song.rank]['rank'] = song.rank
        songs[x][song.rank]['title'] = song.title
        songs[x][song.rank]['artist'] = song.artist
        # look up the song in musixmatch
        api_url = "http://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=%s&q_artist=%s&q_track=%s" % (apikey, quote(song.artist, safe=''), quote(song.title, safe=''))
        url = urllib.request.urlopen(api_url).read().decode('UTF-8')
        result = json.loads(url)
        songs[x][song.rank]['musixmatch'] = result
        # use lyrics id to get lyrics info and store that instead of all the junk from musixmatch
        api_url_lyrics = "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=%s&q_track=%s&q_artist=%s" % (apikey, quote(song.title, safe=''), quote(song.artist, safe=''))
        url_lyrics = urllib.request.urlopen(api_url_lyrics).read().decode('UTF-8')
        lyrics = json.loads(url_lyrics)
        #checks against any songs not in MusixMatch database and any songs without lyrics
        if result['message']['header']['status_code'] != 404 and result['message']['body']['track']['has_lyrics'] == 1:
            lyrics_id = result['message']['body']['track']['lyrics_id']
            get_lyrics = lyrics['message']['body']['lyrics']['lyrics_body']
            songs[x][song.rank]['lyrics'] = get_lyrics

#dump all the data to a json file (readable output)
with open('song-data.json', 'w') as out_file:
    for x in sorted(songs):
        out_file.write('>')
        json.dump(x, out_file)
        out_file.write('\n')
        for y in songs[x]:
            if 'lyrics' in songs[x][y]:
                out_file.write('(')
                json.dump(y, out_file)
                out_file.write(') ' + songs[x][y]['title'] + ' - ' + songs[x][y]['artist'])
                out_file.write('\n')
                json.dump(songs[x][y]['lyrics'].replace('\n', ' '), out_file)
                out_file.write('\n')
                out_file.write('\n')
