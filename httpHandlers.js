const handleError = (err, res) => {
    console.log(err);
    res.status(500).json({error: err});
};

const handleForbidden = (err, res) => {
    console.log(err);
    res.status(403).json({error: 'forbidden'});
};

const handleSuccess = (obj, res) => {
    if (obj) {
        res.status(200).json(obj);
    } else {
        res.status(200).end();
    }
};


module.exports = {
    handleError, handleForbidden, handleSuccess
};