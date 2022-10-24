const controllerUser = require('../controller/index')

const routes = (apps) => {
    apps.route("/name")
    .get(controllerUser.getPaginate)
    .post(controllerUser.add)
    apps.route("/name/:id")
    .delete(controllerUser.delete)
    .put(controllerUser.update)
    apps.route("/nameSearch")
    .get(controllerUser.searchPaginate)
}

module.exports = routes