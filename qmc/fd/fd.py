import numpy as np
import sys

b = 1.0
eps = 0.1
Delta = 0.2

poly = np.polynomial.polynomial
phase = np.array([0.0, 1.0, 1.0, -b]) * np.pi / 2.0
d_phase = poly.polyder(phase)
d2_phase = poly.polyder(phase, 2)

def Psai_T(x):
    fn = poly.polyval(x, phase)
    #fn = np.sin(fn)
    return fn

def d_Psai_T(x):
    #fn = poly.polyval(x, phase)
    #fn = np.cos(fn)
    #fn = fn * poly.polyval(x, d_phase)
    fn = poly.polyval(x, d_phase)
    return fn

def d2_Psai_T(x):
    #t0 = poly.polyval(x, phase)
    #td = poly.polyval(x, d_phase)
    #td2 = poly.polyval(x, d2_phase)
    fn = poly.polyval(x, d2_phase)
    #fn1 = -np.sin(t0) * np.square(td)
    #fn2 = np.cos(t0) * td2
    #fn = fn1 + fn2
    return fn

def ff(d):
    fn = eps / d + d / eps
    return fn

def dd(x):
    t0 = Psai_T(x)
    t1 = d_Psai_T(x)
    fn = -t0 * t1 / np.abs(np.square(t1))
    return fn

def rho(x):
    #return 1.0
    d = np.abs(dd(x))
    Psai_away = np.abs(Psai_T(x))
    f = np.ones_like(x)
    nearNode = d < eps
    f[nearNode] = ff(d[nearNode])
    f[x < -1.0] = 0.0
    f[x > 1.0] = 0.0
    #return Psai_away
    return np.square(f * Psai_away)
    return f * Psai_away

def E_L(x):
    fn = -d2_Psai_T(x) / 2.0
    fn = fn / Psai_T(x)
    return fn

def E_v(x):
    te = E_L(x)
    fn1 = np.square(Psai_T(x)) / rho(x) * te
    fn2 = np.square(Psai_T(x)) / rho(x)
    sigma = np.sqrt(np.std(te) / x.shape[0])
    return np.sum(fn1) / np.sum(fn2), sigma

def sample(N):
    x = np.zeros(N)
    x[0] = 0.5
    for i in range(N - 1):
        x_i = x[i]
        x_i = np.array([x_i])
        #x_prop = x_i + Delta * np.random.uniform(-0.5, 0.5)
        x_prop = x_i + Delta * np.random.normal()
        x_prop = np.array([x_prop])

        ratio = rho(x_prop) / rho(x_i)
        if np.random.random() > ratio:
            x_prop[0] = x_i[0]
        x[i+1] = x_prop[0]
    return x

def run(N):
    x = sample(N)
    x = x[N/10:]
    #print x
    #print rho(x)
    #print Psai_T(x)
    #print d_Psai_T(x)
    print '======'
    print 'N =', N
    ret = E_v(x)
    print ret
    print ret[1] * np.sqrt(N)

def main(argv):
    print argv
    N = int(argv[0])
    print 'N = ', N
    run(N)

if __name__ == '__main__':
    main(sys.argv[1:])
