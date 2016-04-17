import requests
res = requests.get('https://query.openkim.org/api?flat=on&query={"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/structure-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^LatticeConstantCubicEnergy_fcc"},"species.source-value":"Al"}&limit=0&fields={"a.source-value":1,"meta.subject.kimcode":1}&database=data').json()
