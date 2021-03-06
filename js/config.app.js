﻿require({
    urlArgs: "t=" + (new Date()).getTime(),
    packages: [{
        name: "gdapi",
        location: "/google.drive.browser/wwwroot/js"
    }],
    paths: {
        jquery: "/google.drive.browser/wwwroot/js/libs/jquery",
        ajaxTransport: "/google.drive.browser/wwwroot/js/libs/jquery.ajaxTransport",
        knockout: "/google.drive.browser/wwwroot/js/libs/knockout",
        materialize: "/google.drive.browser/wwwroot/js/libs/materialize",
        text: "/google.drive.browser/wwwroot/js/libs/text",
        google: "/google.drive.browser/wwwroot/js/libs/google"
    },
    config: {
        "gdapi/components/app/app": {
            apiKey: "AIzaSyDEOhuBMslfq7dhjIfy8gMsevG0ezeK2fQ",
            clientId: "276479378601-q32fj761jce8l9m50r31hdfft6p90p42.apps.googleusercontent.com",
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