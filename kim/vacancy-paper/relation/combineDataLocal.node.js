const fs = require('fs');
const path = require('path');

const _ = require('underscore');

const SURFACE_JSON_FILE = 'surfaceDataLocal_0920.json';
const ORIGINAL_CSV_FILE = 'fccEAMVacancyData_0919.csv';
const OUTPUT_CSV_FILE = 'fccVacancySurfaceData_0920.csv';

var surfaceData = (() => {
  var raw = fs.readFileSync(SURFACE_JSON_FILE, 'utf-8');
  var json = JSON.parse(raw);
  var data = [];
  for (var i = 0; i < json.length; i++) {
    var record = json[i];
    if (record['lattice'] != 'fcc') {
      continue;
    }
    var model = record['model'];
    var element = record['element'];
    // Using [modelName]#[elementName] as a key hash for data join.
    var hash = [model, element].join('#');

    data[hash] = record;
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

    if (surfaceInfo == undefined) {
      console.log("Not found: " + hash);
      continue;
    }

    if (output.length == 0) {
      items = _.keys(originalInfo).concat(_.keys(surfaceInfo));
      output.push(items.join(','));
    }
    var row = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var value = surfaceInfo[item] == undefined ? originalInfo[item] : surfaceInfo[item];
      row.push(value);
    }
    output.push(row.join(','));
  }
  fs.writeFileSync(OUTPUT_CSV_FILE, output.join('\n'));
  console.log("Data saved to: " + OUTPUT_CSV_FILE);
})();
