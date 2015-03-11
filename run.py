from app import app
from runconfig import port

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)
