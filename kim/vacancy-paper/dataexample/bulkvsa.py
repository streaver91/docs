import requests
import pandas as pd
import matplotlib.pyplot as plt

res_lat = pd.read_json('https://query.openkim.org/api?flat=on&query={"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/structure-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^LatticeConstantCubicEnergy_fcc"}}&limit=0&fields={"a.source-value":1,"species.source-value":1,"meta.subject.kimcode":1}&database=data')
res_bulk = pd.read_json('https://query.openkim.org/api?flat=on&query={"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/bulk-modulus-isothermal-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^ElasticConstantsCubic_fcc"}}&limit=0&fields={"isothermal-bulk-modulus.source-value":1,"meta.subject.kimcode":1,"species.source-value":1}&database=data')
res_lat['species'] = res_lat['species.source-value'].apply(lambda x: x[0])
res_bulk['species'] = res_bulk['species.source-value'].apply(lambda x: x[0])
res = pd.merge(res_lat, res_bulk, how = 'inner', on = ['meta.subject.kimcode', 'species'])

# Remove Outliers
bulk = res['isothermal-bulk-modulus.source-value']
res = res[(bulk > 0) & (bulk < 1000)]

# Plot
res.plot(x = 'a.source-value', y = 'isothermal-bulk-modulus.source-value', style = 'o')
plt.show()

#
# result_lat = requests.post("https://query.openkim.org/api",data={u'flat': u'on', u'database': u'data', u'limit': u'0', u'fields': u'{"a.source-value":1,"meta.subject.kimcode":1}', u'query': u'{"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/structure-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^LatticeConstantCubicEnergy_fcc"}}'}).json()
# dict_lat = {r[u'meta.subject.kimcode']: r[u'a.source-value'] for r in result_lat}
# result_bulk = requests.post("https://query.openkim.org/api",data={u'flat': u'on', u'database': u'data', u'limit': u'0', u'fields': u'{"isothermal-bulk-modulus.source-value":1,"meta.subject.kimcode":1}', u'query': u'{"meta.type":"tr","property-id":"tag:staff@noreply.openkim.org,2014-04-15:property/bulk-modulus-isothermal-cubic-crystal-npt","meta.runner.kimcode":{"$regex":"^ElasticConstantsCubic_fcc"}}'}).json()
# xdata = []
# ydata = []
# for r in result_bulk:
#     model = r[u'meta.subject.kimcode']
#     if not model in dict_lat:
#         continue
#     ydata.append(r[u'isothermal-bulk-modulus.source-value'])
#     xdata.append(dict_lat[model])
# plt.scatter(xdata, ydata)
# plt.xlabel('a')
# plt.ylabel('bulk modulus')
# plt.xlim((0.0, 10.0))
# plt.ylim((0.0,20.0))
# plt.show()
