#include <cstdio>

bool dbg = 0;

int min(int n1, int n2) {
    if(n1 < n2) return n1;
    return n2;
}

void main2() {
    int n;
    long long x[3000], y[3000];

    scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        scanf("%lld %lld", &x[i], &y[i]);
    }
    printf("\n");
    for(int i = 0; i < n; i++) {
        int curMin = 3000;
        for(int j = 0; j < n; j++) {
            if(j == i) continue;
            long long a = y[j] - y[i];
            long long b = -(x[j] - x[i]);
            long long c = a * (-x[i]) + b * (-y[i]);
            if(dbg) printf("%lld %lld %lld\n", a, b, c); 
            int posCnt = 0;
            int negCnt = 0;
            for(int k = 0; k < n; k++) {
                if(k == i || k == j) continue;
                long long t0 = a * x[k] + b * y[k] + c;
                if(t0 > 0) posCnt++;
                if(t0 < 0) negCnt++;
                
            }
            curMin = min(curMin, min(posCnt, negCnt));
        }
        printf("%d\n", curMin);
    }

}

int main() {
    int t;
    scanf("%d", &t);
    for(int i = 0; i < t; i++) {
        printf("Case #%d:", i + 1);
        main2();
    }
    return 0;
}
