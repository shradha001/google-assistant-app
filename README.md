# Develop a Google Assistant App

This is a simple google action application using Node.

## Requirement

- Node.Js
- Gmail Account
  > **Note:** Before starting to build the applications you must turn on Voice & Audio Activity, Web & App Activity (including Chrome browsing history), and Device Information permissions for your Google Account at https://myaccount.google.com/activitycontrols. If your Google Account is managed by your company, Ask your Admin to provide permission to change this settings.

## Steps

- Go to https://developers.google.com/actions/
- Sign In with your google account credentials
- Tap on **GO TO ACTIONS CONSOLE**
- Click on **add/import project**
- Enter the project name, choose a language and country. Next, tap on **CREATE PROJECT**
- In the weclome page, scroll to bottom and tap on **Actions on SDK**
- Copy the command "\*\$ gactions update --action*package \_PACKAGE_NAME* --project **your_project_id\***" and tap on **OK**
- Now clone this repository.
- `cd google-assistant-app` and run `npm install`
  > **Note:** Your server must run on **https**. For test environment, you can use [ngrok](https://ngrok.com/download)
- Next, you need to download gactions, this is a standalone CLI utility which you will need to run and test the application. Download it [here](https://developers.google.com/actions/tools/gactions-cli).
- Once downloaded, move `gactions` to the root directory.
- Make `gactions` executable by setting the appropriate permissions. - On Mac and Linux, run chmod +x gactions to make the binary executable. - On Windows, you must have Administrator rights.
- Now we need to create action package file. To generate this file, type the command `./gactions init` and press Enter. You will recieve the success response as _Action package file successfully created at action.json_
- In `actions.json` file, replace `<INSERT YOUR CONVERSATION NAME HERE>` with `demobot` , `<INSERT YOUR NAME HERE>` with your application's invocation name as you want, for example `my sample app` and `<INSERT YOUR FULLFILLMENT URL HERE>` with `your_https_server_url/gawebhook`
  > **Reference:** Read about Action Package [here](https://developers.google.com/actions/reference/rest/Shared.Types/ActionPackage)
- In the terminal `./gactions update --action_package action.json --project <YOUR PROJECT ID>` , Replace `<YOUR PROJECT ID>` with your Project ID.
- Running the above command will present you with a one time url and prompt you to enter the authorization code. Navigate to the url and finish oauth steps, you will receive an authorization code in your browser window, copy the code and pass it to the prompt. If everything went well so far, then you are ready to test the bot
- Let's now start the server. Run `npm start`
- Go back to Google Action Console.
- Tap on **Invocation**. Type the display name, the same one which you used in the actions.json file. In my case **my sample app** and click on _SAVE_
- Tap on Test >> Simulator. Now say or type **talk to invocation_name**. Example **talk to my sample app**
- Your app is all set for testing

## Sample queries for testing

- carousel
- list
- suggestions
- basic card

## Next Update

API integration
