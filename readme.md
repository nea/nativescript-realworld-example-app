# ![RealWorld Example App](logo.png)
> ### NativeScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

<a href='https://play.google.com/store/apps/details?id=com.insanitydesign.nativescriptrealworldexampleapp&referrer=utm_source%3Dgithub%26utm_medium%3Dreadme'><img width="150px" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
![iOS](https://img.shields.io/badge/iOS-upcoming-yellow.svg)
[![GitHub license](https://img.shields.io/github/license/nea/nativescript-realworld-example-app.svg)](https://github.com/nea/nativescript-realworld-example-app/blob/master/LICENSE.md)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/nea/nativescript-realworld-example-app.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fnea%2Fnativescript-realworld-example-app)

This codebase was created to demonstrate a fully fledged fullstack application built with **NativeScript** including CRUD operations, authentication, routing, pagination, and more.

See how a Medium.com clone (called Conduit) is built using NativeScript to connect to any other backend from https://realworld.io/.

For more information on how to this works with other backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

I've gone to great lengths to adhere to the **NativeScript** community styleguides & best practices but had to adapt between the RealWorld specification and general mobile layout of Medium.com.

## Getting started
It is assumed that you have installed and configured NativeScript properly. If not, head to https://docs.nativescript.org/start/quick-setup and validate its correct functionality.

To start the emulator with this repository:
  > `git clone https://github.com/nea/nativescript-realworld-example-app.git`  
  > `cd nativescript-realworld-example-app`  
  > `tns run android` or `tns run ios`
  
### Development
This project has been developed with [Visual Studio Code](https://code.visualstudio.com/) and the [NativeScript extension](https://www.nativescript.org/nativescript-for-visual-studio-code). It has been tested and live-synced with a local Pixel 2 android23 emulator for the most time.

## How it works
This app works as a NativeScript real-world showcase and is based on [NativeScript 4](https://nativescript.org) Angular/TypeScript style.

Head over to the [NativeScript Docs](https://docs.nativescript.org/angular/start/introduction) to find out how to get started with NativeScript, Angular and Typescript.

### Concepts
This RealWorld app tries to show the following NativeScript concepts:
* i18n
* Custom Component inclusion
* SideDrawer Menu
* Services
* Application Settings
* Custom ActionBar
* Lazy-loading
* Modal Dialogs
* Navigation
* Plugins (NativeScript and npm JavaScript)
* Sass
* TTF inclusion
* e2e testing

To show as many concepts as possible the structure is not necessarily consistent but may differ between views. This example app does not claim best-practice or anything similar but just one way of achieving a result.

### Architecture
The project follows the general NativeScript/Angular structure without any specifics. It uses lazy-loaded modules to encapsulate functionality further. It uses frame and router navigation to go back and forth between pages.

The project itself is mainly located in the `app/` folder. It follows this general architecture:
* `module/` contains the different views and according logic, split into a general, lazy-loaded module structure resembling the UIs
* `service/` contains shared services used to encapsulated global, view-independent logic, i.e. the backend calls
* `model/` contains shared entity classes used as models throughout the other files
* `fonts/` contains [FontAwesome](https://fontawesome.com/v4.7.0/) icons used in the app. See [nativescript-ngx-fonticon](https://market.nativescript.org/plugins/nativescript-ngx-fonticon) for more information
* `i18n/` contains the translation files. See [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize) for more information

#### Files
Each component comes in two parts:
* `xyz.component.ts` the source
* `xyz.component.html` the template

Everything is loaded in their according modules and reached via module-specific routing files:
* `x.module.ts` the general module
* `x.routing.ts` the routing file
* `x.css` according CSS

Not all files are necessarily needed to be encapsulated in such a granularity, but the structure was executed through the source to stay consistent.

### Frontend
This repository orientated on the frontend instructions but adapted to some specifics and based all styling and routing on a mix of the Medium.com app and the overall RealWorld StarterKit instructions.

#### Styles
The UI is composed based on the Medium.com app. If information was missing/different between Conduit and Medium.com a mixed adaptation has been implemented.

#### Routing 
Nearly all routes have been adapted one-to-one into the app. Some differences occur such as `/home`.

#### Screenshots
<img width="200px" src='https://github.com/nea/nativescript-realworld-example-app/blob/master/assets/screenshot_1.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/nea/nativescript-realworld-example-app/blob/master/assets/screenshot_2.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/nea/nativescript-realworld-example-app/blob/master/assets/screenshot_3.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/nea/nativescript-realworld-example-app/blob/master/assets/screenshot_4.png'></img>

### Other Backends
Obviously, this RealWorld app is a frontend app. But it can connect to all backends implementing the [RealWorld](https://github.com/gothinkster/realworld) spec and API. To test you own backend implementation just change the URL in the settings dialog.

### Plugins
This example app uses a set of available NativeScript plugins to visualize the possible usage. Head over to the [NativeScript Market](https://market.nativescript.org/) for more information.

Used NativeScript plugins from https://market.nativescript.org:
* [nativescript-feedback](https://market.nativescript.org/plugins/nativescript-feedback) to show general, fancy messages
* [nativescript-floatingactionbutton](https://market.nativescript.org/plugins/nativescript-floatingactionbutton) to add new articles
* [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize) to localize the static text
* [nativescript-ngx-fonticon](https://market.nativescript.org/plugins/nativescript-ngx-fonticon) to include [FontAwesome](https://fontawesome.com/) icons in menus
* [nativescript-ui-listview](https://market.nativescript.org/plugins/nativescript-ui-listview) to present the articles
* [nativescript-ui-sidedrawer](https://market.nativescript.org/plugins/nativescript-ui-sidedrawer) to add a side-menu
* [nativescript-ui-dataform](https://market.nativescript.org/plugins/nativescript-ui-dataform) to create and edit articles
* [nativescript-ui-autocomplete](https://market.nativescript.org/plugins/nativescript-ui-autocomplete) for the editor tag fields
* [nativescript-social-share](https://market.nativescript.org/plugins/nativescript-social-share) for article sharing
* [nativescript-dev-appium](https://market.nativescript.org/plugins/nativescript-dev-appium) for e2e Appium tests

Other NPM plugins:
* [markdown-js](https://github.com/evilstreak/markdown-js) for article markdown body rendering
* [validator](https://github.com/chriso/validator.js) for Email and URL validation

## Testing
This project has been manually tested against
* Emulator
  * Pixel 2 Android SDK 23
* Devices
  * Samsung S8 Android 8.0.0
  
### Automated tests
The project contains an example e2e test to illustrate an end-to-end test case.
  
## License & Credits
Credits have to go out to [Thinkster](https://thinkster.io/) with their awesome [RealWorld](https://github.com/gothinkster/realworld) idea as well as [NativeScript](https://www.nativescript.org/).

Thanks to all the plugin developers and articles by so many people on the NativeScript blog, forums and https://www.thepolyglotdeveloper.com/. Big thanks!

This project is licensed under the MIT license.

## Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

## Personal Note
*I don't know if this is very useful for a lot of people but I wanted a real-world tutorial with NativeScript, so here we are :) I hope this proves helpful to you... with all its Bugs and Issues ;) If you like it you can give me a shout at [INsanityDesign](https://insanitydesign.com) or let me know via this repository.*
