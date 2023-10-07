IMAGE_NAME = logicea
CONTAINER_NAME = logicea-app

build-app:
	docker build -t $(IMAGE_NAME) .
run:
	docker run -p 3000:3000 --name $(CONTAINER_NAME) $(IMAGE_NAME)
start: build-app run
stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)
clean: stop
	docker rmi $(IMAGE_NAME)
