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

// console.log(data);

var items = [
  'elem',
  'model',
  'a',
  'cohesive-energy',
  'c11',
  'c12',
  'bulk',
  'shear',
  'volume',
  'bulk*volume',
  'shear*volume',
  'formation-energy',
  'migration-energy',
  'relaxation-volume',
  'edt11',
  'spedt11',
  'spedt33',
  'spdst11',
  'spdst33'
];

var itemsLen = items.length;
for(var i = 2; i < itemsLen; i++) {
  items.push('ln_' + items[i])
}
output = [items.join(',')];

for(var i = 0; i < data.length; i++) {
  var row = [];
  var res = data[i];
  var info = res['info'];
  row.push(info['elem']);
  row.push(info['model']);
  var a = res['a']['source-value'];
  row.push(a);
  row.push(-res['free-energy-per-atom']['source-value']);
  var EST = res['partial-elastic-stiffness-tensor']['source-value'];
  var c11 = EST[0][0];
  var c12 = EST[0][1];
  row.push(c11); // c11
  row.push(c12); // c12
  var bulk = (c11 + c12 * 2) / 3;
  var shear = (c11 - c12) / 2;
  row.push(bulk); // bulk
  row.push(shear); // shear
  var vol = Math.pow(a, 3);
  row.push(vol);
  row.push(vol * bulk);
  row.push(vol * shear);
  row.push(res['vacancy-formation-free-energy']['source-value']);
  row.push(res['vacancy-migration-energy']['source-value']);
  row.push(res['vacancy-relaxation-volume']['source-value']);
  row.push(res['elastic-dipole-tensor']['source-value'][0][0]);
  var SPEDT = res['saddle-point-elastic-dipole-tensor']['source-value'];
  row.push(SPEDT[0][0]);
  row.push(SPEDT[2][2]);
  var SPDST = res['saddle-point-defect-strain-tensor']['source-value'];
  row.push(SPDST[0][0]);
  row.push(SPDST[2][2]);

  // Add ln(x)
  var rowLen = row.length;
  for(var j = 2; j < rowLen; j++) {
    var val = row[j];
    if(val > 0) {
      row.push(Math.log(val));
    } else {
      row.push(-100.0);
    }
  }
  output.push(row.join(','));
}

// console.log(output.join('\n'));

fs.writeFileSync('data.csv', output.join('\n'));
