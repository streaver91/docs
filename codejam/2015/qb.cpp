#include <cstdio>
#include <map>
#include <queue>
#include <unordered_map>

using namespace std;

void main2() {
    int d;
    int p[1000];
    
    scanf("%d", &d);

    for(int i = 0; i < d; i++) {
        scanf("%d", &p[i]);
    }
    
    // compress p for fast processing
    priority_queue<int> q;
    unordered_map<int, int> m;

    for(int i = 0; i < d; i++) {
        int pi = p[i];
        if(m.count(pi) == 0) {
            m[pi] = 1;
            q.push(pi);
        } else {
            m[pi]++;
        }
    }

    d = 0;
    int cnt[1000];
    while(!q.empty()) {
        p[d] = q.top();
        cnt[d] = m[p[d]];
        q.pop();
        d++;
    }
    
    // process
    int timeMin = p[0];
    for(int left = 1; left < p[0]; left++) {
        int time = left;
        for(int i = 0; i < d; i++) {
            int pi = p[i];
            if(left < pi) {
                int timeOne = pi / left - 1;
                if(pi % left != 0) timeOne++;
                time += timeOne * cnt[i];
            }
        }
        if(timeMin > time) timeMin = time;
    }
    
    printf("%d\n", timeMin);
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
