require({
    urlArgs: "t=" + (new Date()).getTime(),
    packages: [{
        name: "gdapi",
        location: "/wwwroot/js"
    }],
    paths: {
        jquery: "/wwwroot/js/libs/jquery",
        ajaxTransport: "/wwwroot/js/libs/jquery.ajaxTransport",
        knockout: "/wwwroot/js/libs/knockout",
        materialize: "/wwwroot/js/libs/materialize",
        text: "/wwwroot/js/libs/text",
        google: "/wwwroot/js/libs/google"
    },
    config: {
        "gdapi/components/app/app": {
            apiKey: "AIzaSyAe71ITLk0oFWmFlyox7Tsm-ZkKrbXsJek",
            clientId: "276479378601-rf7j92loflcd9n49cr904ii8vrqjgsiu.apps.googleusercontent.com",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
            ],
            scopes: [
                "https://www.googleapis.com/auth/drive.metadata.readonly",
                "https://www.googleapis.com/auth/drive", 
                "https://www.googleapis.com/auth/drive.file", 
                "https://www.googleapis.com/auth/drive.readonly"
            ]
        }
    }
}, ["gdapi/main"]);