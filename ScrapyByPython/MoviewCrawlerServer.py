#!/usr/bin/env python
"""
Very simple HTTP server in python.
Usage::
    ./dummy-web-server.py [<port>]
Send a GET request::
    curl http://localhost
Send a HEAD request::
    curl -I http://localhost
Send a POST request::
    curl -d "foo=bar&bin=baz" http://localhost
"""

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SocketServer
import json
from collections import OrderedDict 
import thread
import time
import os

class S(BaseHTTPRequestHandler):
    def _set_headers(self, dataType):
        self.send_response(200)
        self.send_header('Content-type', dataType)
        self.end_headers()

    def do_GET(self):
        if self.path == "/MovieInfosIntheater":
            self._set_headers('application/json')
            with open('MovieInfosIntheater.json', 'r') as f:
                MovieInfosIntheater = json.loads(f.read(), object_pairs_hook=OrderedDict)
                self.wfile.write(json.dumps(MovieInfosIntheater))
        elif self.path == "/MovieInfosComingSoon":
            self._set_headers('application/json')
            with open('MovieInfosComingSoon.json', 'r') as f:
                MovieInfosComingSoon = json.loads(f.read(), object_pairs_hook=OrderedDict)
                self.wfile.write(json.dumps(MovieInfosComingSoon))
        else:
            self._set_headers('text/html')
            self.wfile.write("What do you want?")


    def do_HEAD(self):
        self._set_headers('text/html')
        
    def do_POST(self):
        # Doesn't do anything with posted data
        self._set_headers('text/html')
        self.wfile.write("<html><body><h1>POST!</h1></body></html>")
        
def run(server_class=HTTPServer, handler_class=S, port=3000):
    server_address = ('0.0.0.0', port)
    httpd = SocketServer.TCPServer(server_address, handler_class)
    #httpd = server_class(server_address, handler_class)
    print 'Starting httpd.......'
    httpd.serve_forever()

def scrapyForever(delay):
    while True:
        os.system("scrapy crawl MovieInTheaterSpider")
        os.system("scrapy crawl MovieComingSoonSpider")
        time.sleep(delay) 

if __name__ == "__main__":
    from sys import argv

    thread.start_new_thread( scrapyForever, (3600,) )

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()

