from app import app
from runconfig import port
import os
try:
    from runconfig import cert_dir
    from OpenSSL import SSL
except ImportError:
    cert_dir = None


if __name__ == '__main__':
    if cert_dir:
        context = SSL.Context(SSL.TLSv1_2_METHOD)
        context.use_privatekey_file(os.path.join(cert_dir, 'unicorn.key'))
        context.use_certificate_file(os.path.join(cert_dir, 'unicorn.crt'))
        app.run(debug=True, host='0.0.0.0', port=port, ssl_context=context)

    else:
        app.run(debug=True, host='0.0.0.0', port=port)

