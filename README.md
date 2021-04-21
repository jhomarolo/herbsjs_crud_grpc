# HerbsJS Tutorial of a CRUD over gRPC and Node

This project is separated in two parts:
- Server: where gRPC serves the remote calls defined in the proto file using clean architecture with [herbsJS](https://herbsjs.org)
- Client: Express/Node/Bootstrap/Handlebars web page to CRUD the server operations.

In order to run this app, issue in separate command line windows:

- In the root folder:  `npm install`
- Inside the /server folder: `npm start`
- Inside the /client folder: `node index`

Then, go to http://localhost:3000/ and test it out.

## How to test this

I'm using [Bloom RPC](https://github.com/uw-labs/bloomrpc) by now.

<img src="https://github.com/uw-labs/bloomrpc/raw/master/resources/editor-preview.gif" />