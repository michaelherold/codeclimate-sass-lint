.PHONY: image

IMAGE_NAME ?= codeclimate/codeclimate-sass-lint

image:
	docker build --rm -t ${IMAGE_NAME} .
