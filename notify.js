module.exports = function (RED) {
    'use strict';
    if (RED.settings.notify) {
        var timer = RED.settings.notify.timer || 10000;
        setTimeout(function () {
            var trigger = RED.settings.notify.trigger || function (done) { done(); };
            trigger(function () {
                RED.comms.publish('notify', RED.settings.notify);
            });
        }, timer);
    } else {
        RED.httpAdmin.post('/notify', RED.auth.needsPermission("notify.write"), function (req, res) {
            RED.comms.publish('notify', req.body);
            res.json({ status: 'success', body: req.body });
        });
    }

    //RED.plugins.registerPlugin('notify', {
    //    type: 'notify',
    //    onadd: function () { console.log('onadd()'); },
    //    onremove: function () { console.log('onremove()'); }
    //});
};
