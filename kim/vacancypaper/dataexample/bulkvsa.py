import requests
import matplotlib.pyplot as plt
result_lat = requests.post("https://query.openkim.org/api",data={u'flat': u'on', u'database': u'data', u'limit': u'0', u'fields': u'{"a.source-value":1,"meta.subject.kimcode":1}', u'query': u'{"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/structure-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^LatticeConstantCubicEnergy_fcc"}}'}).json()
dict_lat = {r[u'meta.subject.kimcode']: r[u'a.source-value'] for r in result_lat}
result_bulk = requests.post("https://query.openkim.org/api",data={u'flat': u'on', u'database': u'data', u'limit': u'0', u'fields': u'{"isothermal-bulk-modulus.source-value":1,"meta.subject.kimcode":1}', u'query': u'{"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/bulk-modulus-isothermal-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^ElasticConstantsCubic_fcc"}}'}).json()
xdata = []
ydata = []
for r in result_bulk:
    model = r[u'meta.subject.kimcode']
    if not model in dict_lat:
        continue
    ydata.append(r[u'isothermal-bulk-modulus.source-value'])
    xdata.append(dict_lat[model])
plt.scatter(xdata, ydata)
plt.xlabel('a')
plt.ylabel('bulk modulus')
plt.xlim((0.0, 10.0))
plt.ylim((0.0,20.0))
plt.show()
