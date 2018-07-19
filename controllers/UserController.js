var User = require('../models/User');

module.exports = {
    createUser: function(params, callback) {
        User.create(params, function(err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
            return;
        });
    }
}