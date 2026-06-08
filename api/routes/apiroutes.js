const express = require('express');
const controller = require('./../controllers/apiController');
const tradeController = require('./../controllers/tradeController');
const accountController = require('../controllers/accountController');
const serviceController = require('./../controllers/serviceController');
const bookingController = require('./../controllers/bookingController');
const router = express.Router();

//Trader routes
router.get('/', tradeController.getTraders);
router.get('/trader/:id', tradeController.getTrader);
router.get('/toptraders', tradeController.getTopTraders);
router.get('/trades', tradeController.getTradeType);

//Account Routes
router.post('/login', accountController.postLogin);
router.post('/register', accountController.postRegistration);
router.post('/setupprofile/:id', accountController.postProfileSetup);
router.get('/profile/:id', accountController.getProfile);
router.get('/account/:id', accountController.getAccount);
router.put('/updateaccount/:id', accountController.updateAccount);

//Services Routes
router.get('/servicetitle/:id', serviceController.getServiceTitlesPerTrader);
router.get('/services/:id', serviceController.getServices);
router.get('/editservice/:id', serviceController.getEditService);
router.put('/editservice/:id', serviceController.updateService);
router.post('/addservice/:id', serviceController.postServices);
router.delete('/deleteservice/:id', serviceController.deleteService);

//Booking Routes
router.get('/bookings/:id', bookingController.getBookings);
router.get('/booking/:id', bookingController.getBooking);
router.get('/bookingserv/:id', bookingController.getServicesForBooking);
router.post('/bookingserv/:id', bookingController.postBooking);
router.put('/updatebooking/:id', bookingController.updateBookingStatus);

//General
router.post('/checkavail/:id', controller.checkAvailability);
router.post('/reviews/:id', controller.postReview);

module.exports = router;