lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	cd frontend
	npm run start

start-backend:
	npx start-server

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run postinstall
	npm run build