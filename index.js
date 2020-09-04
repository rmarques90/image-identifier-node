const http = require("http");
const fs = require("fs");
const vision = require('./vision');
const express = require("express");
const multer = require("multer");
const cors = require('cors');
const { handleError, handleForbidden, handleSuccess } = require('./httpHandlers');
const { validToken } = require('./constants');

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const upload = multer({
    dest: "pictures/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const router = express.Router();

router.use((req, res, next) => {
    if (req.header('Authorization') && req.header('Authorization') === validToken) {
        next();
    } else {
        handleForbidden('wrong token', res);
    }
});

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const tempPath = req.file.path;
        const targetPath = "./pictures/" + req.file.originalname;

        fs.renameSync(tempPath, targetPath);

        let labels = await vision.labelDetection(targetPath);

        let objToReturn = {
            hotdog: false,
            labelsFound: labels
        };

        if (labels.length && labels.filter(l => l === 'hotdog' || l === 'hot dog' || l === 'sausage').length) {
            objToReturn.hotdog = true;
        }

        handleSuccess(objToReturn, res);
    } catch (e) {
        handleError(e, res);
    }
});

app.use('/', router);
