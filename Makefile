lint-frontend:
	make -C frontend lint

install:
	npm ci --legacy-peer-deps

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npm start

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build