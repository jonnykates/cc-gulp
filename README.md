# Readme

This repository contains the Gulpfile that I sometimes use when I am developing for Raising IT. Ultimately, it allows for local `.scss` changes to be reflected live in your browser, despite the platform being on a live remote server. No more refreshing the page to see your changes! I find that this makes my workflow more efficient, so I thought I'd share with other Raising IT designers.

### DISCLAIMER
Whilst nothing here is super complicated, it's certainly more verbose than just compiling your Sass using the vanilla Sass command line tool, or using some kind of GUI compiler like [CodeKit](https://codekitapp.com/). Things may fall over. If you get stuck then just Slack me.

## About Gulp
[Gulp](http://gulpjs.com/) is a task runner. You write short jobs for it to do, and then it executes them as and when you need them. One example might be to tell Gulp to listen for any changes made to a `.scss` partial, and then compile the `main.scss` file when it detects a change.

If you have never used Gulp, then I would *highly* advise getting to terms with understanding the way it works before you use the files in this repository. Don't use things you don't understand! Gulp's '[Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)' documentation is a good place to, er, get started.

# Walkthrough

## 1. Copy files to your project
Go ahead and copy the `package.json` and `gulpfile.js` files from this repository into the root of your codeclips folder.

## 2. Install development dependencies
In order for the Gulp tasks I've written to run properly, we'll need to install some plugins into our project. Our development dependencies are listed in the `package.json` file. We'll then use [npm](https://www.npmjs.com/package/npm) to install these dependencies.

Firstly, make sure you have npm installed by running the following in your terminal:

```
npm -v
```

If you don't get a version number returned, then go and [install node.js](https://nodejs.org/en/download/), which comes with npm bundled.

Once we have npm; navigate to the root of your project in your terminal, and run:

```
npm install
```

This will install all of the `devDependencies` listed in `package.json` into a new folder called `node_modules`. You might get a few warning messages here as it churns away, which is normal, but hopefully no critical errors.

**NB** - This is going to create thousands of small files. You will therefore want to add `node_modules` to your `.gitignore` file. Don't commit these to Git!

## 3. Set our proxy URL
You will need to update the URL on line 31 of your `gulpfile.js` to your Raising IT platform URL for the project you are working on. Make sure you save the file.

## 4. Run our default Gulp task
As I said earlier, "*Don't use things you don't understand!*". Look through the gulpfile and work out what is going on. Then, when you're ready, you just need to run one command from the terminal at your project root:

```
gulp
```

That's it! Give it a minute or so to fire everything up and we should be in action (it may literally take a whole minute, be patient). You should get *two* local servers automatically opening up in your browser once it's done.

The first - on port 8000 - is serving our local .css and .js files. The second, is a proxy server on port 3000 to the URL we added on line 31 of the gulpfile.

**NB** - Importantly, the Gulp task is actually still running in the background. It's now listening for any changes you make to .scss partials. When it notices a change, it's going to compile `main.scss` and refresh your localhost:3000 browser!

## 4. Point your platform to your served files
Of course, we need to tell the platform where our local .css and .js files are. In your custom code areas in the Platform, you need to add the following to the head:

```
<link rel="stylesheet" type="text/css" href="http://localhost:8000/main.css">
```

And in the body block:

```
<script type="text/javascript" src="http://localhost:8000/main.js"></script>
```

## 5. Write your SCSS
Every time you now touch and save a .scss partial, your changes should be reflected live in your localhost:3000 tab!