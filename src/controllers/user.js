const Bcrypt = require('bcrypt');

var User = require('../models/user');

exports.validate = async (request, username, password, h) => {

    if (username == 'help') {
        return { response: h.redirect('https://hapijs.com/help') };
    }

    const user = users[username];
    if(!user) {
        return { credentials: null, isValid: false };
    }

    const isvalid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
    
}
