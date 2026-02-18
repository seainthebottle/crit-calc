import http.server
import ssl
import os

# Generate self-signed certificate if not exists
if not os.path.exists("server.pem"):
    print("Generating self-signed certificate...")
    # Requires openssl installed or we use python to generate.
    # Since openssl command might fail or not be in path, let's try openssl command first via os.system
    # But checking openssl version failed in previous step (it was just backgrounded).
    
    # Let's try to trust that openssl works or fail.
    # Actually, let's use a simpler approach: run openssl command directly.
    pass

server_address = ('0.0.0.0', 4443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# Create context
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

# We need a certificate file.
# Let's try to generate one using a subprocess call to openssl if it's available.
# Otherwise, we can't easily do HTTPS without a cert file.
# Assuming user has git capability likely implies some posix tools or openssl.
try:
    if not os.path.exists("key.pem") or not os.path.exists("cert.pem"):
        os.system('openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"')

    context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f"Serving HTTPS on https://localhost:4443")
    print(f"Serving HTTPS on https://<YOUR_IP>:4443")
    httpd.serve_forever()
except Exception as e:
    print(f"Error starting HTTPS server: {e}")
    print("Make sure openssl is installed and available in PATH to generate certificates.")
