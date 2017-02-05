#Guilds

##Starting to contribute in the Guilds project:
Guilds is being built using Meteor. The following are the packages/tools you need to be familiar with in order to contribute:
* An understanding on Meteor. We use the import file structure described [here](https://themeteorchef.com/snippets/understanding-the-imports-directory/)
* We use the ES2015 Standard as much as possible, see [here](https://babeljs.io/learn-es2015/) , [here](http://info.meteor.com/blog/es2015-get-started) and [here](http://eslint.org).
* Bootstrap is our CSS framework, [see here](http://getbootstrap.com).
* Notable packages used where familiarity is needed:
  * [Flow Router](https://kadira.io/academy/meteor-routing-guide/content/introduction-to-flow-router)
  * [Collection 2](https://github.com/aldeed/meteor-collection2)
  * [Simple Schema](https://github.com/aldeed/meteor-simple-schema)
  * [Validated Method](https://github.com/meteor/validated-method)
  * [Reactive Var](https://docs.meteor.com/api/reactive-var.html)
  * [Reactive dict](https://atmospherejs.com/meteor/reactive-dict)
  * [Session](https://docs.meteor.com/api/session.html)

###About the structure of the project:
This project is using the import file structure as mentioned above. More precisely:

* The starting loading points for the client and the server are `/imports/startup/client/index.js` and `/imports/startup/server/index.js` respectively.
* Each html file is loaded in its corresponding js file.
* The principal layouts are loaded in the `/imports/startup/client/ui.js`.
* The js files for the central pages are loaded with the definition of the corresponding route.
* Component js files (and corresponding html pages) are loaded as needed in the parent js files.


##Useful links
* [Dynamic templates by meteor chef](https://themeteorchef.com/snippets/using-dynamic-templates/)
* [Meteor Chef](https://themeteorchef.com)
* [Text editor](http://ckeditor.com/pricing)
* [On Route Restrictions](https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42#.86e18hqwt)
##Notebook
LOGIC: London Order of Gentlemen In Computing
