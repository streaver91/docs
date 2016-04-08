from scipy.interpolate import interp1d
from scipy.optimize import fmin
from scipy.optimize import fmin_cg
from scipy.misc import derivative
import numpy as np
x = np.linspace(2.60, 2.85, 6)
y = np.array([
    -15.72006230,
    -15.73356400,
    -15.74046259,
    -15.74176566,
    -15.73837088,
    -15.73107685
    ])
print x
print y

f2 = interp1d(x, y, kind='cubic')
print fmin_cg(f2, 2.7)

xx = np.linspace(2.60, 2.85, 10)
yy = f2(xx)
omega = (2 * xx)**3
ecube = yy
shift = 170
omega_shift = omega - shift
print omega
print ecube
f3 = interp1d(omega_shift, ecube, kind='cubic')
print fmin_cg(f3, 2.74)
d2_f3 = derivative(f3, -5.6959, n=2, order=5)
print d2_f3

