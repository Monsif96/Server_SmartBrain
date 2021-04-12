const handleprofile = (req, res, Db) => {
    const { id } = req.params;
    Db.select('*').from('users').where({ id: id })
        .then(user => {
            if (condition) {
                res.json(user[0]);   
            } else {
                res.status(400).json('Not Found');
            }
        })
        .catch(err => res.status(400).json('error getting user !'))
}


module.exports = {
    handleprofile: handleprofile
}