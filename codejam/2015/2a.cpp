#include <cstdio>
#include <cstdlib>
#include <cstring>

int dbg = 1;

long long get10n(long long n) {
    if(n == 0) return 1;
    return get10n(n - 1) * 10;
}

long long recur(long long num) {
    if(dbg) printf("Calling recur(%lld)\n", num);

    char nStr[20];
    sprintf(nStr, "%lld", num);
    int digits = strlen(nStr);
    if(digits == 1) return num;

    bool zeroRight = true;
    for(int i = digits / 2; i < digits; i++) {
        if(nStr[i] != '0') {
            zeroRight = false;
            break;
        }
    }
    if(zeroRight == true) return recur(num - 1);

    bool zeroLeft = true;
    if(nStr[0] != '1') zeroLeft = false;
    for(int i = 1; i < digits / 2; i++) {
        if(nStr[i] != '0') {
            zeroLeft = false;
            break;
        }
    }
    
    long long ret = recur(get10n(digits - 1) - 1) + 1;
    
    if(zeroRight && zeroLeft) return ret;

    if(zeroLeft == false) {
        char lrevStr[20];
        for(int i = digits / 2 - 1; i >= 0; i--) {
            lrevStr[digits / 2 - 1 - i] = nStr[i];
        }
        lrevStr[digits / 2] = '\0';
        long long lrev;
        sscanf(lrevStr, "%lld", &lrev);
        if(dbg) printf("lrev = %lld\n", lrev);
        ret += lrev + 1;
    }
    
    ret += num % get10n((digits + 1) / 2);
    if(dbg) printf("ret += %lld\n", num % get10n((digits + 1) / 2));
    if(zeroLeft == false) ret--;
    if(dbg) printf("num = %lld, ret = %lld\n", num, ret);
    return ret;
}

void main2() {
    long long n;
    scanf("%lld", &n);
    printf("%lld\n", recur(n)); 
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
