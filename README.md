##Image identifier


Application to identify labels for image, using Google Vision API.

First you need to create a file on resources folder called: `myCredential.json` with your Google Vision Credentials.

All you need to do is call the endpoint `/upload` with an form-data content type, with image on `file` property and wait for response.