#include <cstdio>

void main2() {
    int smax;
    scanf("%d", &smax);

    int n;  // already obtained
    int sum;
    int cnt;

    n = 0;
    sum = 0;
    cnt = 0;
    char ch;

    scanf("%c", &ch);
    for(int i = 0; i < smax + 1; i++) {
        if(n < i) n = i;
        scanf("%c", &ch);
        cnt = ch - '0';
//        printf("%d ", cnt);
        n += cnt;
        sum += cnt;;
    }

    printf("%d\n", n - sum);
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

