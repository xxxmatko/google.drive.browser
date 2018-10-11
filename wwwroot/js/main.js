define([
    "jquery",
    "knockout",
    "materialize"
], function ($, ko, M) {
    //#region [ Register components ]
    
    ko.components.register("app", { require: "gdapi/components/app/app" });

    //#endregion

    // Start the application
    $(function () {
        ko.applyBindings({});
    });
});