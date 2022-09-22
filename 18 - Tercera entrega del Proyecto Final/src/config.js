export default {
    mongodb: {
        connectionString : process.env.CONNECTIONSTRING
    },
    firebase: {
        "type": "service_account",
        "project_id": "codercoco-e1668",
        "private_key_id": process.env.PRIVATEKEYID,
        "private_key": process.env.PRIVATEKEY,
        "client_email": "firebase-adminsdk-xndks@codercoco-e1668.iam.gserviceaccount.com",
        "client_id": "100698134521532106025",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xndks%40codercoco-e1668.iam.gserviceaccount.com"
    },
}