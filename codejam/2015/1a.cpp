#include <cstdio>

void main2() {
    int n;
    int m[1000];

    scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &m[i]);
    }

    int min1, min2;
    //
    //
    // determine min1
    min1 = 0;
    for(int i = 0; i < n - 1; i++) {
        if(m[i + 1] < m[i]) {
            int diff = m[i] - m[i + 1];
            min1 += diff;
        }
    }

    // determine min2
    int minDiff = 0;
    for(int i = 0; i < n - 1; i++) {
        if(m[i + 1] < m[i]) {
            int diff = m[i] - m[i + 1];
            if(minDiff < diff) minDiff = diff;
        }
    }
    min2 = 0;
    for(int i = 0; i < n - 1; i++) {
        if(m[i] > minDiff) {
            min2 += minDiff;
        } else {
            min2 += m[i];
        }
    }

    printf("%d %d\n", min1, min2);
}

int main() {
    int t;
    scanf("%d", &t);
    for(int i = 0; i < t; i++) {
        printf("Case #%d: ", i + 1);
        main2();
    }
    return 0;
}
