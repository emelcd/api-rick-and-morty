import requests
import json
from flask import Flask
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

data = []

@app.route('/q/<query>')
def query(query):
    with open('data.json', 'r') as outfile:
        data = json.load(outfile)

    if query == 'all':
        return json.dumps({
            'results': data
        })

    querys = []

    for i in data:
        if query in i['name'].lower():
            querys.append(i)

    return json.dumps({
        'results': querys
    })


@app.route('/')
def index():
    with open('data.json', 'r') as outfile:
        data = json.load(outfile)
    return json.dumps({
        'results': data
    })

# with open('data.json', 'r') as outfile:
#     data = json.load(outfile)

# places = []
# species = []

# for i in data:
#     if i['species'] not in species:
#         species.append(i['species'])
#     if i['location']['name'] not in places:
#         places.append(i['location']['name'])

# with open('q.json', 'w', encoding='utf-8') as outfile:
    json.dump({
        'places': places,
        'species': species

    }, outfile)

# n_pages = requests.get('https://rickandmortyapi.com/api/character?page=2').json()['info']['pages']

# data = []

# for i in range(1, n_pages):
#     r = requests.get('https://rickandmortyapi.com/api/character?page={}'.format(i))
#     for i in r.json()['results']:
#         print(i)
#         data.append(i)

# with open('data.json', 'w', encoding='utf-8') as outfile:
#     json.dump(data, outfile)

if __name__ == '__main__':
    app.run(debug=True)

