from firebase_admin import auth, credentials, initialize_app

class FirebaseUtil:
    def __init__(self):
        # Initialize the Firebase Admin SDK with service account credentials
        cred = credentials.Certificate("firebase-admin-key.json")
        initialize_app(cred)

    def authorize(self, request):
        try:
            # Get the Firebase JWT token from the Authorization header
            auth_header = request.headers.get('Authorization')
            token = auth_header.split(' ')[1]

            # Verify the Firebase JWT token
            claims = auth.verify_id_token(token)

            # Return success and the user id
            return (200, claims['uid'])
        
        except Exception as e:
            # Token is not valid or has expired
            return (401, e)