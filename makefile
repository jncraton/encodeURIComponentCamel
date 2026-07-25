all:

lint:
	npx prettier --check *.html *.js

format:
	npx prettier --write *.html *.js

test:
	node camel.js
