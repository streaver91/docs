import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Configs
M = 50000
NStep = 1000
Delta = 5.0

def PStar(x):
    y = np.sqrt(x**2) * x + 0.5
    y[np.abs(x) > 20] = 0
    return y

def main():
    X = (np.random.random(M) - 0.5) * 10

    steps = np.arange(NStep)

    fAvg = 0.0
    fSq = 0.0

    for i in np.nditer(steps):
        Y = X + Delta * (np.random.random(M) - 0.5)
        A = PStar(Y) / PStar(X)
        selected = (A > np.random.random(M))
        X[selected] = Y[selected]

    mean = np.average(X)
    sigma = np.std(X)

    print 'Mean:', mean
    print 'Sigma:', sigma

    df = pd.DataFrame({'X': X})
    df['X'].hist(bins = 50)
    # plt.show()

if __name__ == '__main__':
    main()
