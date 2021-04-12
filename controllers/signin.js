const handlesignin = (req, res, Db, bcrypt) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission !')
    }
    Db.select('email', 'hash').from('login').where('email', '=', email )
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                Db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable getting user !'))
            } else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handlesignin: handlesignin
}