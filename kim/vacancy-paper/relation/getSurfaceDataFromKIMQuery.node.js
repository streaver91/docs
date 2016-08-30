const fs = require('fs');
const path = require('path');

const needle = require('needle');

const URL = 'https://query.openkim.org/api';
const FIELDS = {
  'meta.subject.kimcode': 1,
  'meta.runner.kimcode': 1,
  'miller-indices.source-value': 1,
  'space-group.source-value': 1,
  'short-name.source-value': 1,
  'species.source-value': 1,
  'surface-energy.source-value': 1,
  'a.source-value': 1
};
const QUERY = {
  'meta.type': 'tr',
  'property-id': 'tag:staff@noreply.openkim.org,2014-05-21:property/surface-energy-cubic-crystal-npt',
  'meta.runner.kimcode': {
    '$regex': '^SurfaceTest_'
  }
};

const OPTIONS = {
  flat: 'on',
  database: 'data',
  limit: '0',
  fields: JSON.stringify(FIELDS),
  query: JSON.stringify(QUERY)
};

needle.post(URL, OPTIONS, function(err, res) {
  fs.writeFileSync('surfaceData.json', JSON.stringify(res.body));
});



