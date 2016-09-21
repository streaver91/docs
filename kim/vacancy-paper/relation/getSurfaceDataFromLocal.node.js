var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var edn2json = require('edn2json');

const TR_PATH = '/home/junhao/Downloads/er0920/er';
const FIRST_PROPERTY = 'tag:staff@noreply.openkim.org,2014-05-21'
    + ':property/surface-energy-broken-bond-fit-cubic-bravais-crystal-npt';
const SURFACE_ENERGY_PROPERTY = 'tag:staff@noreply.openkim.org,2014-05-21'
    + ':property/surface-energy-cubic-crystal-npt';

var dirs = fs.readdirSync(path.join(TR_PATH));

var data = [];

console.log('Total results: ' + dirs.length);

for(var i = 0; i < dirs.length; i++) {
  var dir = dirs[i];
  var resultFile = path.join(TR_PATH, dir, 'results.edn');
  if(!fs.existsSync(resultFile)) continue;

  // Parse EDN.
  var EDNResult = fs.readFileSync(resultFile, 'utf8');
  JSONResult = edn2json.parse(EDNResult);

  var entry = {};

  // Get surface test results.
  var hasSurfaceResults = false;
  for (var j = 0; j < JSONResult.length; j++) {
    var currentResult = JSONResult[j];
    var propertyId = currentResult['property-id'];
    if (propertyId != SURFACE_ENERGY_PROPERTY) continue;
    var millerIndices = currentResult['miller-indices']['source-value'];
    var surfaceEnergy = currentResult['surface-energy']['source-value'];
    entry['surface' + millerIndices.join('')] = surfaceEnergy;
    hasSurfaceResults = true;
  }

  if (hasSurfaceResults == false) continue;

  // Parse model and element.
  var pipelineInputFile = path.join(TR_PATH, dir, 'pipeline.stdin');
  var pipelineInput = fs.readFileSync(pipelineInputFile, 'utf8');
  pipelineInput = pipelineInput.trim().split(/[\r\n]+/);
  var element = pipelineInput[2];
  var lattice = pipelineInput[3];
  var model = pipelineInput[4];

  // Construct data row entry.
  _.assign(entry, {
    element: element,
    lattice: lattice,
    model: model
  });

  data.push(entry);
}

console.log(data);
console.log('Surface results: ' + data.length);

fs.writeFileSync('surfaceDataLocal_0920.json', JSON.stringify(data, null, 2));
