lint-frontend:
	make -C frontend lint

install:
	npm ci --legacy-peer-deps

start-frontend:
	npx react-scripts start

start-backend:
	npx start-server -p 5001

deploy:
	git push heroku main

start:
	npm start

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build