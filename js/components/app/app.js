define([
    "module",
    "jquery",
    "knockout",
    "google!client:auth2",
    "text!./app.html",
    "ajaxTransport"
], function (module, $, ko, api, view) {
    //#region [ Fields ]

    var global = (function() { return this; })();
    var cnf = module.config();

    //#endregion


    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Argumenty.
     * @param {object} info Komponent info.
	 */
    var Model = function (args, info) {
        console.log("App : ctor()");

        this.isConnected = ko.observable(false);
        this.isConnecting = ko.observable(false);
        this.isSignedIn = ko.observable(false);
        this.nextPage = ko.observable("");
        this.files = ko.observableArray([]);
    };

    //#endregion


    //#region [ Event Handlers ]

    /**
     * Event handler for the init event.
     */
    Model.prototype._onInit = function () {
        this.isConnected(true);
        this.isConnecting(false);

        // Listen for sign-in state changes.
        api.auth2.getAuthInstance().isSignedIn.listen(this._onStatuChanged.bind(this));

        this.isSignedIn(api.auth2.getAuthInstance().isSignedIn.get());

        if(this.isSignedIn()) {
            this.listFiles();
        }
    };


    /**
     * Event handler for the signed in status change event.
     * 
     * @param {boolean} isSignedIn If set to true user is signed in.
     */
    Model.prototype._onStatuChanged = function (isSignedIn) {
        if(isSignedIn) {
            this.isConnected(true);
            this.isSignedIn(true);
            return;
        }

        this.isSignedIn(false);
        this.isConnecting(false);
        this.isConnected(false);
    };


    /**
     * Event handler for the files listed event.
     * 
     * @param {object} e Arguments.
     */
    Model.prototype._onFilesListed = function (e) {
        this.nextPage(e.result.nextPageToken ? e.result.nextPageToken : "");

        var files = e.result.files;
        
        if (!files || !files.length) {
            this.files([]);
            return;
        }

        this.files(this.files().concat(files));
    };       

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Gets corresponding mime type.
     * 
     * @param {string} mimeType Mime type.
     */
    Model.prototype._mimeType = function(mimeType) {
        switch(mimeType) {
            case "application/vnd.google-apps.document":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case "application/vnd.google-apps.spreadsheet":
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case "application/vnd.google-apps.audio":
                return "application/zip";
            case "application/vnd.google-apps.drawing":
                return "application/zip";
            case "application/vnd.google-apps.file":
                return "application/zip";
            case "application/vnd.google-apps.folder":
                return "application/zip";
            case "application/vnd.google-apps.form":
                return "application/zip";
            case "application/vnd.google-apps.fusiontable":
                return "application/zip";
            case "application/vnd.google-apps.map":
                return "application/zip";
            case "application/vnd.google-apps.photo":
                return "application/zip";
            case "application/vnd.google-apps.presentation":
                return "application/zip";
            case "application/vnd.google-apps.script":
                return "application/zip";
            case "application/vnd.google-apps.site":
                return "application/zip";
            case "application/vnd.google-apps.unknown":
                return "application/zip";
            case "application/vnd.google-apps.video":
                return "application/zip";
            case "application/vnd.google-apps.drive-sdk":
                return "application/zip";
            default:
                return "application/zip";
        }
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
	 * Connects to Google Drive.
	 */
    Model.prototype.connect = function () {
        this.isConnecting(true);
        
        api.client.init({
            apiKey: cnf.apiKey,
            clientId: cnf.clientId,
            discoveryDocs: cnf.discoveryDocs,
            scope: cnf.scopes.join(" ")
        }).then(this._onInit.bind(this));
    };


    /**
	 * Signs int.
	 */
    Model.prototype.signIn = function () {
        api.auth2.getAuthInstance().signIn();
    };  


    /**
	 * Signs out.
	 */
    Model.prototype.signOut = function () {
        api.auth2.getAuthInstance().signOut();
    };    
    

    /**
	 * Lists files.
     * 
     * @param {string} nextPage Next page token.
	 */
    Model.prototype.listFiles = function (nextPage) {
        var query = {
            pageSize: 10,
            orderBy: "name",
            fields: "*"
        };

        if(nextPage) {
            query.pageToken = nextPage;
        }        

        api.client.drive.files
            .list(query)
            .then(this._onFilesListed.bind(this));
    };   

    
    /**
     * Gets file.
     * 
     * @param {object} file File to get.
     */
    Model.prototype.getFile = function (file) {
        // Get the token
        var token = api.client.getToken();

        // Prepare request data
        var prms = {
            method: "GET",
            url: "https://www.googleapis.com/drive/v3/files/" + file.id,
            headers: {
                "Authorization": [token.token_type, token.access_token].join(" ")
            },
            dataType: "arraybuffer",
            data: {
                "key": cnf.apiKey
            }            
        };

        if (file.webContentLink) {
            prms.data.alt = "media";
        }
        else {
            prms.url += "/export";
            prms.data.mimeType = this._mimeType(file.mimeType);
        }

        // Download or export file
        $.ajax(prms).then(function(data, status, xhr) {
            var blob = new Blob([data], {
                type: xhr.getResponseHeader("Content-Type")
            });

            if (global.navigator.msSaveOrOpenBlob) {
                global.navigator.msSaveOrOpenBlob(blob, file.name);
                return;
            }
            
            var url = global.URL.createObjectURL(blob);
            var $a = $("<a/>", {
                "href": url,
                "download": file.name,
                "text": "click"
            }).hide().appendTo("body");
            $a[0].click();
            $a.remove();
            global.URL.revokeObjectURL(url);              
        });
    };


    /**
     * Dispose.
     */
    Model.prototype.dispose = function () {
        console.log("App : dispose()");
    };

    //#endregion


    //#region [ Methods : Static ]

    /**
	 * Factory method.
	 *
	 * @param {object} params Parameters.
     * @param {object} componentInfo Component into.
     * @returns {object} Instance of the model.
	 */
    Model.createViewModel = function (params, componentInfo) {
        global.app = new Model(params, componentInfo);
        return global.app;
    };

    //#endregion

    return {
        viewModel: { createViewModel: Model.createViewModel },
        template: view
    };
});