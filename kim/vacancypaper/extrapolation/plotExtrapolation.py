import csv
import numpy as np
import matplotlib.pyplot as plt

data = {}
with open('sizeResults.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        for key in row:
            val = float(row[key])
            if key in data:
                data[key].append(val)
            else:
                data[key] = [val]
    for key in data:
        data[key] = np.array(data[key])

oneOverAtoms = 1 / data['nAtoms']
print type(oneOverAtoms)

for key in data:
    if key == 'nAtoms':
        continue
    ydata = data[key] / data[key][0]
    plt.plot(oneOverAtoms, ydata, 'o--', label = key)
    plt.text(oneOverAtoms[-1], ydata[-1], key)
    print (data[key] / data[key][0])

plt.legend()
plt.xlabel('1 / Number of Atoms')
plt.ylabel('Normalized Property Value')
plt.savefig('extrapolation.pdf')

plt.show()
