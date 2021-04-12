const Clarifai = require('Clarifai');
const appp = new Clarifai.App({apiKey: 'f80c978af82b4fc29b810e54a2122819'});

const handleApiCall = (req, res) => {
    appp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { res.json(data);})
        .catch(err => res.status(400).json('unable to work with Api !'))
}

const handleimage = (req, res, Db) => {
    const { id } = req.body;
    Db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries !'))
}

module.exports = {
    handleimage,
    handleApiCall
}