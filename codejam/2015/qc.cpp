#include <cstdio>

int prodTable[5][5] = {
    {0, 0, 0, 0, 0},
    {0, 1, 2, 3, 4},
    {0, 2, -1, 4, -3},
    {0, 3, -4, -1, 2},
    {0, 4, 3, -2, -1}
};

int prod(int n1, int n2) {
    if(n1 < 0) return -prod(-n1, n2);
    if(n2 < 0) return -prod(n1, -n2);
    return prodTable[n1][n2];
}

int getNum(char ch) {
    if(ch == 'i') return 2;
    if(ch == 'j') return 3;
    if(ch == 'k') return 4;
    return 0;
};

int getLoops(int l, char* seq) {
    int cur = 1;
    int loops = 0;
    do {
        for(int i = 0; i < l; i++) {
            cur = prod(cur, getNum(seq[i]));
        }
        loops++;
        if(loops > 8) {
            return -1;
        }
    } while (cur != 1);
    return loops;
}

void main2() {
    int l;
    long long x;
    scanf("%d%lld", &l, &x);
    char ch;
    scanf("%c", &ch);

    char seq[10000];
    for(int i = 0; i < l; i++) {
        scanf("%c", &seq[i]);
    }
    
    int stage = 2;
    int cur = 1;
    long long curSearch = 0;
    for(long long i = 0; i < l * x; i++) {
        cur = prod(cur, getNum(seq[i % l]));
        curSearch++;
        if(curSearch > l * 8) {
            printf("NO\n");
            return;
        }
        if(stage == cur) {
            stage++;
            curSearch = 0;
            cur = 1;
            if(stage == 5) {
                int loops = getLoops(l, seq);
                if(loops == -1) {
                    printf("NO\n");
                    return;
                }
                i += (l * x - i) / (l * loops) * (l * loops);
            }
        }
    }

    if(stage == 5 && cur == 1) {
        printf("YES\n");
    } else {
        printf("NO\n");
    }
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
