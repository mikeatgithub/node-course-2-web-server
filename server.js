const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// 'next' tells Express what to do after express is done.
// If the current middleware function does not end the
// request-response cycle, it must call next() to pass
// control to the next middleware function. Otherwise,
// the request will be left hanging.
app.use((req, res, next) => {
    const now = new Date().toString();
    let logLine = `${now} -- ${req.method} -- ${req.url}`;
    console.log(logLine);
    fs.appendFile('server.log', logLine + '\n', (err) => {
        if (err) {
            console.log('unable to appen to log file.');
        }
    });
    
    next();
});

app.use((req, res, next) => {
    
    res.render('maintenance.hbs');

    /*
    since we want to stop app's progress we
    will not call next() function.
    next();
    */
});

// app.use() registers a middleware, in 
// this case it resgisters express's static middleware 
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return (new Date().getFullYear());
});

hbs.registerHelper('changeToUpperCase', (changeText) => {
    return (changeText.toUpperCase());
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send ({
    //     name: 'Morrey',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome To My Page.',
    });
});

app.get('/about', (req, res) => {
    // res.send ('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send ({
        errorMessage: 'Unable to ...'
    });
});

app.listen(3000, () => {
    console.log('\nServer is up & running on port 3000 ...');
});
