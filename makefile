all:

format:
	npx prettier --write *.html *.js

test:
	node camel.js
