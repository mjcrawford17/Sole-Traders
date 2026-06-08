const { body } = require('express-validator');

const loginValidation = [

    body('username')
        .trim()
        .notEmpty().withMessage(' Username required!')
        .isLength({ min: 4, max: 15 }).withMessage(' Username must be 4 - 15 characters')
        .matches(/^[a-zA-Z0-9]+$/).withMessage(' Username has invalid characters'),

    body('userpass')
        .trim()
        .notEmpty().withMessage(' Password required')
        .isLength({ min: 8, max: 18 }).withMessage(' Password must be 8 - 18 characters')
];

const registrationValidation = [

    body('usernamereg')
        .trim()
        .notEmpty().withMessage(' Username required')
        .isLength({ min: 4, max: 15 }).withMessage(' Username must be 4 - 15 characters')
        .matches(/^[a-zA-Z0-9]+$/).withMessage(' Username has invalid characters'),

    body('userpassreg')
        .trim()
        .notEmpty().withMessage(' Password required')
        .isLength({ min: 8, max: 18 }).withMessage(' Password must be 8 - 18 characters'),

    body('fullname')
        .trim()
        .notEmpty().withMessage(' Full Name required')
        .isLength({ min: 5, max: 40 }).withMessage(' Full Name must be 5 - 40 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Full Name has invalid characters'),

    body('email')
        .trim()
        .notEmpty().withMessage(' Email required')
        .isEmail().withMessage(' Invalid email format')
        .normalizeEmail()
];

const profileValidation = [

    body('trade_type')
        .trim()
        .notEmpty().withMessage(' Trade type required')
        .isLength({ min: 2, max: 30 }).withMessage(' Trade type must be 2 - 30 characters')
        .matches(/^[a-zA-Z0-9\s,'-]+$/).withMessage(' Trade type contains invalid characters'),

    body('region')
        .trim()
        .notEmpty().withMessage(' Region required')
        .isLength({ min: 2, max: 50 })
        .withMessage(' Region must be 2 - 50 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Region contains invalid characters'),

    body('bio')
        .trim()
        .notEmpty().withMessage(' Bio required')
        .isLength({ min: 5, max: 250 }).withMessage(' Bio must be 5 - 250 characters'),

    body('avail_start')
        .notEmpty().withMessage(' Availability start time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage(' Invalid start time format'),

    body('avail_end')
        .notEmpty().withMessage(' Availability end time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage(' Invalid end time format'),

    body('avail_details')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 }).withMessage(' Availability details must be under 100 characters')
];

const accountValidation = [

    body('username')
        .trim()
        .notEmpty().withMessage(' Username required')
        .isLength({ min: 4, max: 15 }).withMessage(' Username must be 4 - 15 characters')
        .matches(/^[a-zA-Z0-9]+$/).withMessage(' Username has invalid characters'),

    body('name')
        .trim()
        .notEmpty().withMessage(' Full Name required')
        .isLength({ min: 5, max: 40 }).withMessage(' Full Name must be 5 - 40 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Full Name has invalid characters'),

    body('email')
        .trim()
        .notEmpty().withMessage(' Email required')
        .isEmail().withMessage(' Invalid email format')
        .normalizeEmail(),

    body('trade_type')
        .trim()
        .notEmpty().withMessage(' Trade type required')
        .isLength({ min: 2, max: 30 }).withMessage(' Trade type must be 2 - 30 characters')
        .matches(/^[a-zA-Z0-9\s,'-]+$/).withMessage(' Trade type contains invalid characters'),

    body('region')
        .trim()
        .notEmpty().withMessage(' Region required')
        .isLength({ min: 2, max: 50 })
        .withMessage(' Region must be 2 - 50 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Region contains invalid characters'),

    body('bio')
        .trim()
        .notEmpty().withMessage(' Bio required')
        .isLength({ min: 5, max: 250 }).withMessage(' Bio must be 5 - 250 characters'),

    body('avail_start')
        .notEmpty().withMessage(' Availability start time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage(' Invalid start time format'),

    body('avail_end')
        .notEmpty().withMessage(' Availability end time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage(' Invalid end time format'),

    body('avail_details')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 }).withMessage(' Availability details must be under 100 characters')
];

const bookingValidation = [

    body('name')
        .trim()
        .notEmpty().withMessage(' Full Name required')
        .isLength({ min: 5, max: 40 }).withMessage(' Full Name must be 5 - 40 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Full Name has invalid characters'),

    body('email')
        .trim()
        .notEmpty().withMessage(' Email required')
        .isEmail().withMessage(' Invalid email format')
        .normalizeEmail(),

    body('description')
        .trim()
        .notEmpty().withMessage(' Description required')
        .isLength({ max: 250 }).withMessage(' Description must be under 250 characters'),

    body('location')
        .trim()
        .notEmpty().withMessage(' Location required')
        .isLength({ min: 2, max: 50 }).withMessage(' Location must be 2 - 50 characters')
        .matches(/^[a-zA-Z ]+$/).withMessage(' Location has invalid characters'),

    body('requested_date')
        .notEmpty().withMessage(' Date required')
        .isISO8601({ strict: true }).withMessage(' Invalid date format (YYYY-MM-DD)'),

    body('requested_start')
        .notEmpty().withMessage(' Start time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage('Invalid start time (HH:MM)'),

    body('requested_end')
        .notEmpty().withMessage(' End time required')
        .customSanitizer(v => v.slice(0, 5))
        .isTime({ hourFormat: 'hour24' }).withMessage('Invalid end time (HH:MM)')
];

const serviceValidation = [

    body('title')
        .trim()
        .notEmpty().withMessage(' Title required')
        .isLength({ min: 3, max: 60 }).withMessage(' Title must be 3 - 60 characters')
        .matches(/^[a-zA-Z0-9\s.,'&]+$/).withMessage(' Title contains invalid characters'),

    body('description')
        .trim()
        .notEmpty().withMessage(' Description required')
        .isLength({ min: 5, max: 200 }).withMessage(' Description must be 5 - 200 characters'),

    body('pricing_type')
        .notEmpty().withMessage(' Pricing type required')
        .isIn(['hourly', 'fixed']).withMessage(' Invalid pricing type selected'),

    body('base_price')
        .trim()
        .notEmpty().withMessage(' Base price required')
        .isFloat({ min: 0.01, max: 1000000.00 }).withMessage(' Base price must be a valid amount between 0.01 and 1,000,000')
        .toFloat()
];

const reviewValidation = [

    body('client_name')
        .trim()
        .notEmpty().withMessage(' Full Name required')
        .isLength({ min: 5, max: 40 }).withMessage(' Full Name must be 5 - 40 characters')
        .matches(/^[a-zA-Z' -]+$/).withMessage(' Full Name has invalid characters'),
    
    body('client_email')
        .trim()
        .notEmpty().withMessage(' Email required')
        .isEmail().withMessage(' Invalid email format')
        .normalizeEmail(),
    
    body('stars')
        .trim()
        .notEmpty().withMessage(' Stars rating required')
        .isInt({ min: 1, max: 5 }).withMessage(' Stars must be between 1 and 5')
];

module.exports = { loginValidation, registrationValidation, accountValidation, profileValidation, bookingValidation, serviceValidation, reviewValidation };