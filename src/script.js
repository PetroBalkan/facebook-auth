function handle_fb_data(response) {
    var accessToken = response.authResponse.accessToken;
    FB.api('/me', function (response) {
        response['accessToken'] = accessToken;
        alert('Successful login for: ' + response.name + '\nCheck console: (F12)');
        console.log(response);
        $.ajax({
            type: 'post',
            url: '/do/reg/fb', // Youe API
            data: response,
            success: function (msg) {
                console.log(msg);
                if ((msg == 'зарегались') || (msg == 'залогинились')) {
                    window.location.reload();
                }
            },
            error: function () {
            }
        })
    });
}

function fb_login() {
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            handle_fb_data(response);
        } else {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    handle_fb_data(response);
                }
            });
        }
    }, {
        scope: 'email,id'
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1939730396347452',
        cookie: true,
        // the session
        xfbml: true,
        version: 'v2.8'
    });
};
// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));