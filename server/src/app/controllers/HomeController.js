class HomeController {
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    //[GET] /search
    search( req, res) {
        res.render('search');
    }
}