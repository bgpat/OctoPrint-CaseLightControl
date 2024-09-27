/*
 * View model for OctoPrint-CaseLightControl
 *
 * Author: Atsushi Tanaka
 * License: AGPLv3
 */
$(function() {
    function CaseLightControlViewModel(parameters) {
        var self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];
        self.controlViewModel = parameters[0];

        self.currentStatus = ko.observable(null);

        self.isOperational = ko.computed(function() {
            return self.controlViewModel.isOperational();
        });
        self.isOperational.subscribe(function(val) {
            if (val) {
                self.sync();
            }
        });

        self.buttonOnEnabled = ko.computed(function() {
            return self.isOperational() && (self.currentStatus() === null || self.currentStatus() === "OFF");
        });
        self.buttonOffEnabled = ko.computed(function() {
            return self.isOperational() && (self.currentStatus() === null || self.currentStatus() !== "OFF");
        });

        self.sync = function() {
            OctoPrint.control.sendGcode(['M355']);
        };

        self.brightness = ko.observable(null);
        self.brightness.subscribe(function(val){
            OctoPrint.control.sendGcode(['M355 P' + parseInt(val)]);
        });
        self.brightnessPercentage = ko.computed(function() {
            return Math.round(self.brightness() / 255 * 100);
        });

        self.turnOn = function() {
            OctoPrint.control.sendGcode(['M355 S1']);
        };

        self.turnOff = function() {
            OctoPrint.control.sendGcode(['M355 S0']);
        };

        self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin !== "caselightcontrol") {
                return;
            }

            self.currentStatus(data.status);

            if (data.status === "OFF") {
                return;
            }
            var brightness = parseInt(data.status)
            if (isNaN(brightness)) {
                console.error("caselightcontrol: failed to parse status", data);
                return;
            }
            if (self.brightness() == null) {
                self.brightness(brightness);
            }
        };
    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: CaseLightControlViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: ["controlViewModel"],
        // Elements to bind to, e.g. #settings_plugin_caselightcontrol, #tab_plugin_caselightcontrol, ...
        elements: ["#tab_plugin_caselightcontrol"]
    });
});
