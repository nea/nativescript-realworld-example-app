> **This repository is heavy in development and not to be used for now!**

# ![RealWorld Example App](logo.png)
> ### NativeScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **NativeScript** including CRUD operations, authentication, routing, pagination, and more.

See how a Medium.com clone (called Conduit) is built using NativeScript to connect to any other backend from https://realworld.io/.

For more information on how to this works with other backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

I've gone to great lengths to adhere to the **NativeScript** community styleguides & best practices but had to adapt between the RealWorld specification and general mobile layout of Medium.com.

## WORK IN PROGRESS
**Done** | *ToDo*

* **Basic structure, UI, templates and Android-Emulator-based testing**
* **Data models**
* **Home page (URL: /home)**
  * *List of tags*
  * **List of articles pulled from either Feed, Global**, *or by Tag*
  * *Pagination for list of articles* (**sort of: Endless scroll**)
* *Sign in/Sign up pages (URL: /login, /register )*
  * **Uses JWT (store the token in localStorage)**
  * *Authentication can be easily switched to session/cookie based*
* *Settings page (URL: /settings )*
* **Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )**
* **Article page (URL: /article/article-slug-here )**
  * *Delete article button (only shown to article's author)*
  * **Render markdown from server client side**
  * **Comments section at bottom of page**
  * **Delete comment button (only shown to comment's author)**
* **Profile page (URL: /profile/:username, /profile/:username/favorites )**
  * **Show basic user info**
  * **List of articles populated from author's created articles or author's favorited articles**
* *Write automated test(s)*

## Getting started
It is assumed that you have installed and configured NativeScript properly. If not, head to https://docs.nativescript.org/start/quick-setup and validate its correct functionality.

To start the emulator with this repository:
  > `git clone https://github.com/nea/nativescript-realworld-example-app.git`  
  > `cd nativescript-realworld-example-app`  
  > `npm install`  
  > `tns run android` or `tns run ios`

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
The project follows the general NativeScript/Angular structure without any specifics. It uses lazy-loaded modules to encapsulate functionality further. It uses frame and router navigation to go back and forth between pages.

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
  
## License & Credits
Credits have to go out to [Thinkster](https://thinkster.io/) with their awesome [RealWorld](https://github.com/gothinkster/realworld) idea as well as [NativeScript](https://www.nativescript.org/).

This project is licensed under the MIT.

## Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

## Personal Note
*I don't know if this is very useful for a lot of people but I wanted a real-world tutorial with NativeScript, so here we are :) I hope this proves helpful to you... with all its Bugs and Issues ;) If you like it you can give me a shout at [INsanityDesign](https://insanitydesign.com) or let me know via this repository.*
