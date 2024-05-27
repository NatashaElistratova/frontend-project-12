build:
	rm -rf frontend/build
	npm run postinstall
	npm run build

frontend start:
	cd frontend
	npm run start