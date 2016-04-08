#include <cstdio>

bool dbg = 0;

void main2() {
    int b;
    long long n;
    long long m[1000];
    long long mmax = 0;
    scanf("%d%lld", &b, &n);
    for(int i = 0; i < b; i++) {
        scanf("%lld", &m[i]);
        if(m[i] > mmax) mmax = m[i];
    }
    
    long long tL = 0l;
    long long tR = n * mmax;
    long long tM;
    long long mtLeft[1000];
    long long processed = 0;

    if(dbg) printf("n = %lld\n", n);
    while(tL < tR) {
        tM = (tL + tR) >> 1;
        processed = 0;
        for(int i = 0; i < b; i++) {
            long long processedI = 0;
            processedI += tM / m[i];
            if(tM % m[i] != 0) {
                processedI++;
            }
            mtLeft[i] = processedI * m[i] - tM;
            processed += processedI;
        }
        if(dbg) printf("tM = %lld, processed = %lld\n", tM, processed);
        if(tM == tL) {
            break;
        }
        if(processed == n - 1) break;
        if(processed < n - 1) tL = tM;
        else tR = tM - 1;
    }

    for(tM = tR + 2; tM >= tL - 2; tM--) {
        processed = 0;
        for(int i = 0; i < b; i++) {
            int processedI = 0;
            processedI += tM / m[i];
            if(tM % m[i] != 0) {
                processedI++;
            }
            mtLeft[i] = processedI * m[i] - tM;
            processed += processedI;
        }
        if(dbg) printf("tM = %lld, processed = %lld\n", tM, processed);
        if(processed < n) break;
    }

    if(dbg) printf("tM = %lld\n", tM);
    if(dbg) printf("prcessed = %lld\n", processed);
    long long mtLeftMin = 100000l;
    for(int i = 0; i < b; i++) {
        if(mtLeftMin > mtLeft[i]) mtLeftMin = mtLeft[i];
    }
    for(int i = 0; i < b; i++) {
        if(mtLeft[i] == mtLeftMin) {
            processed++;
            if(dbg) printf("Processed2: %lld\n", processed);
            if(processed == n) {
                printf("%d\n", i + 1);
                return;
            }
        }
    }

}

int main() {
    int t;
    scanf("%d", &t);
    for(int i = 0; i < t; i++) {
        // dbg = (i == 67);
        printf("Case #%d: ", i + 1);
        main2();
    }
    return 0;
}
