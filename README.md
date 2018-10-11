# Google Drive Browser

Simple browser application that makes requests to the Google Drive API.

To run this application, which makes requests to the Drive API, complete the steps described in the rest of this page.

## Turn on the Drive API

1. Use [this wizard](https://console.developers.google.com/flows/enableapi?apiid=drive) to create or select a project in the Google Developers Console and automatically turn on the API. Click **Continue**, then **Go to credentials**.
1. On the **Add credentials to your project** page, click the **Cancel** button.
1. At the top of the page, select the **OAuth consent screen** tab. Select an **Email address**, enter a **Product name** if not already set, and click the **Save** button.
1. Select the **Credentials** tab, click the **Create credentials** button and select **OAuth client ID**.
1. Select the application type **Web application**.
1. In the **Authorized JavaScript origins** field, enter the URL `http://localhost:8000`. Enter the same URL in the **Authorized redirect URIs** field as well.
1. Click the **Create** button.
1. Take note of the client ID in the resulting dialog. You will need it in a later step.
1. Click **OK** to dismiss the resulting dialog.
1. Click the **Create credentials** button and select **API key**.
1. Take note of the API key in the resulting dialog. You will need it in a later.
1. Click the **Close** button to create an unrestricted key. In production applications, you can restrict access to the API key to specific websites, IP addresses or mobile apps.

## Run the sample
1. Download the source code of this repository.
1. Open the folder with [Visual Studio Code](https://code.visualstudio.com/).
1. Install the [IIS Express](https://marketplace.visualstudio.com/items?itemName=warren-buckley.iis-express) extension.
1. In order to build the project install [node.js](https://nodejs.org/en/).
1. Build the project using the `build.cmd`.
1. Run the application by pressing `Ctrl + F5`.