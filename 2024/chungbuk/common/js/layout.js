$(document).on('ready.responsive', function(event) {
    $.screen({
        state : [{
            name : 'wide',
            horizontal : {
                from : 9999,
                to : 1201
            }
        }, {
            name : 'web',
            horizontal : {
                from : 1200,
                to : 1001
            }
        }, {
            name : 'tablet',
            horizontal : {
                from : 1000,
                to : 641
            }
        }, {
            name : 'phone',
            horizontal : {
                from : 640,
                to : 0
            }
        }]
    });
});
