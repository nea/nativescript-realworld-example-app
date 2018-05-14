# ![RealWorld Example App](logo.png)

  > **This repository is heavy in development and not to be used for now!**

> ### NativeScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **NativeScript** including CRUD operations, authentication, routing, pagination, and more.

See how a Medium.com clone (called Conduit) is built using NativeScript to connect to any other backend from https://realworld.io/.

For more information on how to this works with other backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

I've gone to great lengths to adhere to the **NativeScript** community styleguides & best practices but had to adapt between the RealWorld specification and general mobile layout of Medium.com.

## How it works
This app works as a NativeScript real-world showcase and is based on [NativeScript](https://nativescript.org) 4.0.0 Angular/TypeScript style.

Head over to the [NativeScript Docs](https://docs.nativescript.org/angular/start/introduction) to find out how to get started with NativeScript, Angular and Typescript.

### Structure
The project itself is mainly located in the `app/` folder. It follows this general architecture:
* `module/` contains the different views and according logic, split into a general, lazy-loaded module structure resembling the UIs
* `service/` contains shared services used to encapsulated global, view-independent logic, i.e. the backend calls
* `model/` contains shared entity classes used as models throughout the other files
* `fonts/` contains [FontAwesome](https://fontawesome.com/v4.7.0/) icons used in the app. See [nativescript-ngx-fonticon](https://market.nativescript.org/plugins/nativescript-ngx-fonticon) for more information
* `i18n/` contains the translation files. See [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize) for more information

### Architecture
The project follows the general NativeScript/Angular structure without any specifics. It uses lazy-loaded modules to encapsulate functionality further.

#### Files
Each component comes in three parts:
* `xyz.component.ts` the source
* `xyz.component.html` the template
* `xyz.component.css` according CSS

Everything is loaded in their according modules and reached via module-specific routing files:
* `x.module.ts` the general module
* `x.routing.ts` the routing file

Not all files are necessarily needed to be encapsulated in such a granularity, but the structure was executed through the source to stay consistent.

### Plugins
This example app uses a set of available NativeScript plugins to visualize the possible usage. Head over to the [NativeScript Market](https://market.nativescript.org/) for more information.

Used plugins
* [nativescript-feedback](https://market.nativescript.org/plugins/nativescript-feedback) to show general, fancy messages
* [nativescript-floatingactionbutton](https://market.nativescript.org/plugins/nativescript-floatingactionbutton) to add new articles
* [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize) to localize the static text
* [nativescript-ngx-fonticon](https://market.nativescript.org/plugins/nativescript-ngx-fonticon) to include [FontAwesome](https://fontawesome.com/) icons in menus
* [nativescript-toast](https://market.nativescript.org/plugins/nativescript-toast) to show short information messages
* [nativescript-ui-listview](https://market.nativescript.org/plugins/nativescript-ui-listview) to present the articles
* [nativescript-ui-sidedrawer](https://market.nativescript.org/plugins/nativescript-ui-sidedrawer) to add a side-menu
* [nativescript-ui-dataform](https://market.nativescript.org/plugins/nativescript-ui-dataform) to create and edit articles
* [nativescript-ui-autocomplete](https://market.nativescript.org/plugins/nativescript-ui-autocomplete) for the editor tag fields
* [nativescript-toolbox](https://market.nativescript.org/plugins/nativescript-toolbox) for markdown parsing
* [nativescript-social-share](https://market.nativescript.org/plugins/nativescript-social-share) for article sharing

## Testing
This project has been tested against
* Emulator
  * Pixel 2 Android SDK 23
  * iPhoneX iOS
* Devices
  * iPhone 7 iOS 11.3.1
  * Samsung S8 Android 8.0.0

## Getting started
It is assumed that you have installed and configured NativeScript properly. If not, head to https://docs.nativescript.org/start/quick-setup and validate its correct functionality.

To start the emulator with this repository:
  > `git clone https://github.com/nea/nativescript-realworld-example-app.git`  
  > `cd nativescript-realworld-example-app`  
  > `npm install`  
  > `tns run android||ios`
  
## Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

## Personal Note
*I don't know if this is very useful for a lot of people but I wanted a real-world tutorial with NativeScript, so here we are :) I hope this proves helpful to you... with all its Bugs and Issues ;) If you like it you can give me a shout at [INsanityDesign][1] or let me know via this repository.*
