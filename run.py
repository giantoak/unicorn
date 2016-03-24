from app import app
from app.config import uni_host, uni_port
import os
try:
    from app.config import uni_cert_dir
    from OpenSSL import SSL
except ImportError:
    uni_cert_dir = None


if __name__ == '__main__':
    if uni_cert_dir is not None:
        context = SSL.Context(SSL.TLSv1_2_METHOD)
        context.use_privatekey_file(os.path.join(uni_cert_dir, 'unicorn.key'))
        context.use_certificate_file(os.path.join(uni_cert_dir, 'unicorn.crt'))
        app.run(debug=True, host=uni_host, port=uni_port, ssl_context=context)

    else:
        app.run(debug=True, host=uni_host, port=uni_port)

