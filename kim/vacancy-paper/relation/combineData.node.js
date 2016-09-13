const fs = require('fs');
const path = require('path');

const _ = require('underscore');

const SURFACE_JSON_FILE = 'surfaceData.json';
const ORIGINAL_CSV_FILE = 'dataFccVacancy.csv';
const OUTPUT_CSV_FILE = 'dataFccVacancySurface.csv';

var surfaceData = (() => {
  var raw = fs.readFileSync(SURFACE_JSON_FILE, 'utf-8');
  var json = JSON.parse(raw);
  var data = [];
  for (var i = 0; i < json.length; i++) {
    var record = json[i];
    if (record['short-name.source-value'][0] == 'bcc') {
      continue;
    }
    var model = record['meta.subject.kimcode'];
    var element = record['species.source-value'][0];
    var hash = [model, element].join('#');
    var miller = record['miller-indices.source-value'].join('');
    var surfaceEnergy = record['surface-energy.source-value'];
    data[hash] = data[hash] || {};
    data[hash]['surface-energy-' + miller] = surfaceEnergy;
  }
  return data;
})();

var originalData = (() => {
  var raw = fs.readFileSync(ORIGINAL_CSV_FILE, 'utf-8');
  raw = raw.split(/[\r\n]+/g);
  var items = raw[0].split(',');
  var data = [];
  for (var i = 1; i < raw.length; i++) {
    var row = raw[i].split(',');
    var rowData = (() => {
      var obj = {};
      for (var j = 0; j < items.length; j++) {
        obj[items[j]] = row[j];
      }
      return obj;
    })();
    var model = rowData['model'];
    var element = rowData['elem'];
    var hash = [model, element].join('#');
    data[hash] = rowData;
  }
  return data;
})();

console.log(originalData);

(() => {
  var output = [];
  var items;
  for (var hash in originalData) {
    var surfaceInfo = surfaceData[hash];
    var originalInfo = originalData[hash];
    if (output.length == 0) {
      items = _.keys(originalInfo).concat(_.keys(surfaceInfo));
      output.push(items.join(','));
    }
    var row = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      row.push(surfaceInfo[item] == undefined ? originalInfo[item] : surfaceInfo[item]);
    }
    output.push(row.join(','));
  }
  fs.writeFileSync(OUTPUT_CSV_FILE, output.join('\n'));
})();