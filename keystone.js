// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// mongodb://<dbuser>:<dbpassword>@ds159497.mlab.com:59497/heroku_zl4qwbt1
MONGODB_DB_USERNAME = "heroku_zl4qwbt1";
MONGODB_DB_PASSWORD = "d3kaco1ohq35qv2lqd7e306859";
MONGODB_DB_HOST = "ds159497.mlab.com:59497";
APP_NAME = "heroku_zl4qwbt1";

var connectionString = MONGODB_DB_USERNAME + ":" +  MONGODB_DB_PASSWORD + "@" + MONGODB_DB_HOST + '/' + APP_NAME;

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.set('cloudinary config', 'cloudinary://595672238391946:UDTLmuywZOGg49PBOH5IdBcwdjg@grafuls' );

keystone.init({
	'name': 'keystone-heroku',
	'brand': 'keystone-heroku',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'mongo': connectionString,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'test',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
