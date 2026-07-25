all: test

lint:
	npx --yes prettier@3.6.2 --check .
	uvx black@24.1.0 --check .

format:
	npx --yes prettier@3.6.2 --write .
	uvx black@24.1.0 .

test:
	node camel.js
