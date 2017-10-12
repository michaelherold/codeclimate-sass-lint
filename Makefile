.PHONY: clean image integration_test test

IMAGE_NAME ?= codeclimate/codeclimate-sass-lint

clean:
	rm -rf tmp/

image:
	docker build --rm -t ${IMAGE_NAME} .

integration_test:
	test/integration/test.sh

test:
	docker run --rm ${IMAGE_NAME} sh -c "cd /usr/src/app && npm test"
