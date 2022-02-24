const catalog = require('../models/catalog');
const User = require('../models/users');
var kart = require('../models/kart');
var order = require('../models/order');
var routes = (app) => {
    app.get('/', async(req, res) => {
        res.json({
            message: 'Welcome to the beginning of nothingness.'
        });
    });
    app.post('/signup', async(req, res) => {
        var phone = req.body.phone;
        var password = req.body.password;
        var userType = req.body.userType;
        if (phone && password && userType) {
            // Check if user exists

            User.findOne({
                mobile: phone
            }, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    });
                } else {
                    if (!user) {
                        // Create new user
                        var newUser = new User({ mobile, password, userType });
                        newUser.save((err, user) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: err
                                });
                            } else {
                                res.json({
                                    success: true,
                                    message: 'User created!'
                                });
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'User already exists!'
                        });
                    }
                }
            });
        }
    });
    app.post('/login', async(req, res) => {
        var phone = req.body.phone;
        var password = req.body.password;
        if (phone && password) {
            User.findOne({
                mobile: phone,
                password: password
            }, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    });
                } else {
                    if (user) {
                        res.json({
                            success: true,
                            message: 'User found!'
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'User not found!'
                        });
                    }
                }
            });
        }
    });
    app.get('/products', async(req, res) => {

        catalog.find({}, (err, products) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (products) {
                    res.json({
                        success: true,
                        message: 'Products found!',
                        products: products
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Products not found!'
                    });
                }
            }
        });
    });
    app.get('/products/:id', async(req, res) => {
        var id = req.params.id;
        await catalog.findById({ _id: id }, (err, product) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (product) {
                    res.json({
                        success: true,
                        message: 'Product found!',
                        product: product
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Product not found!'
                    });
                }
            }
        });
    });
    app.get('/kart/:id', async(req, res) => {
        var id = req.params.id;
        await kart.findById({ user_id: id }, (err, kart) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (kart) {
                    res.json({
                        success: true,
                        message: 'Kart found!',
                        kart: kart
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Kart not found!'
                    });
                }
            }
        });
    });
    app.get('/orders/:user_id', async(req, res) => {
        var user_id = req.params.user_id;
        await order.find({ user_id: user_id }, (err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (orders) {
                    res.json({
                        success: true,
                        message: 'Orders found!',
                        orders: orders
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Orders not found!'
                    });
                }
            }
        });
    });
    app.get('/orders/:user_id/:order_id', async(req, res) => {
        var user_id = req.params.user_id;
        var order_id = req.params.order_id;
        await order.find({ user_id: user_id, _id: order_id }, (err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (orders) {
                    res.json({
                        success: true,
                        message: 'Orders found!',
                        orders: orders
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Orders not found!'
                    });
                }
            }
        });
    });
    app.get('/allorder/:id', async(req, res) => {
        var id = req.params.id;
        await User.findById({ _id: id }, async(err, user) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (user) {
                    if (user.userType == 'admin') {
                        await order.find({}, (err, orders) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: err
                                });
                            } else {
                                if (orders) {
                                    res.json({
                                        success: true,
                                        message: 'Orders found!',
                                        orders: orders
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'Orders not found!'
                                    });
                                }
                            }
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'User not found!'
                    });
                }
            }
        });

    });
    app.get('/upgrade_order_step/:id', async(req, res) => {
        var order_ = await order.findById({ _id: req.params.id });
        var stage = order_.stage;
        await order.findByIdAndUpdate({ _id: req.params.id }, { stage: stage + 1 }, (err, order) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {
                if (order) {
                    res.json({
                        success: true,
                        message: 'Order updated!'
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Order not updated!'
                    });
                }
            }
        });
    });
};
module.exports = routes;