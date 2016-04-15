var fs = require('fs');
var path = require('path');

TR_PATH = '/home/junhao/Downloads/er';

var dirs = fs.readdirSync(path.join(TR_PATH));

var data = [];

for(var i = 0; i < dirs.length; i++) {
  var dir = dirs[i];
  var file = path.join(TR_PATH, dir, 'summary.json');
  if(!fs.existsSync(file)) continue;
  var res = require(file);
  data.push(res);
}

console.log(data);

var items = [
  'elem',
  'model',
  'a',
  'cohesive-energy',
  'c11',
  'c12',
  'vacancy-formation-energy',
  'vacancy-migration-energy',
  'vacancy-relaxation-volume',
  'edt11',
  'spedt11',
  'spedt33'
];

output = [items.join(',')];

for(var i = 0; i < data.length; i++) {
  row = [];
  res = data[i];
  info = res['info'];
  row.push(info['elem']);
  row.push(info['model']);
  row.push(res['a']['source-value']);
  row.push(res['free-energy-per-atom']['source-value']);
  var EST = res['partial-elastic-stiffness-tensor']['source-value'];
  row.push(EST[0][0]);
  row.push(EST[0][1]);
  row.push(res['vacancy-formation-free-energy']['source-value']);
  row.push(res['vacancy-migration-energy']['source-value']);
  row.push(res['vacancy-relaxation-volume']['source-value']);
  row.push(res['elastic-dipole-tensor']['source-value'][0][0]);
  SPEDT = res['saddle-point-elastic-dipole-tensor']['source-value'];
  row.push(SPEDT[0][0]);
  row.push(SPEDT[2][2]);
  output.push(row.join(','));
}

console.log(output.join('\n'));

fs.writeFileSync('data.csv', output.join('\n'));
