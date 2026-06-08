const express = require('express');
const controller = require('../controllers/generalControllers');
const controllerTrade = require('./../controllers/traderControllers');
const controllerAccount = require('./../controllers/accountSetupControllers');
const controllerService = require('./../controllers/serviceControllers');
const controllerBooking = require('./../controllers/bookingControllers');
const router = express.Router({ mergeParams: true });
const { isAuth } = require('./../middleware/auth');
const { loginValidation, registrationValidation, profileValidation, accountValidation, bookingValidation, serviceValidation, reviewValidation } = require('./../middleware/validationrules');

//Trader/Home Routes
router.get('/', controllerTrade.home);
router.get('/terms', controllerTrade.getTerms);
router.get('/traders', controllerTrade.getTraders);
router.get('/profile/:id', controllerTrade.getProfile);

//Account Setup/Login
router.get('/login', controllerAccount.getLogin);
router.post('/login', loginValidation, controllerAccount.postLogin);
router.get('/logout', isAuth, controllerAccount.getLogout);
router.post('/register', registrationValidation, controllerAccount.postRegistration);
router.get('/setupprofile', isAuth, controllerAccount.getProfileSetup);
router.post('/setupprofile', profileValidation, controllerAccount.postProfileSetup);
router.get('/editaccount', isAuth, controllerAccount.getEditAccount);
router.post('/editaccount', accountValidation, controllerAccount.updateAccount);
router.get('/account', isAuth, controllerAccount.getAccount);

//Service Routes
router.get('/services', isAuth, controllerService.getServices);
router.get('/addservice', isAuth, controllerService.getAddService);
router.post('/addservice', isAuth, serviceValidation, controllerService.postAddService);
router.get('/editservice/:id', isAuth, controllerService.getEditService);
router.post('/editservice/:id', serviceValidation, controllerService.updateService);
router.post('/deleteservice/:id', isAuth, controllerService.deleteService);

//Bookings
router.get('/bookservice/:id', controllerBooking.getBookingPage);
router.post('/bookservice/:id', bookingValidation, controllerBooking.postBookingPage);
router.get('/bookings', isAuth, controllerBooking.getBookings);
router.get('/viewbooking/:id', isAuth, controllerBooking.getSingleBooking);
router.post('/updatebooking/:id', isAuth, controllerBooking.updateBookingStatus);

//General Routes
router.get('/review/:id', controller.getReview);
router.post('/review/:id', reviewValidation, controller.postReview);
router.get('/404', controller.get404Page);

module.exports = router;