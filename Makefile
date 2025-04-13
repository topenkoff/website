DOCKERFILE=" \n\
FROM node:23-slim \n \
RUN apt-get update \ \n \
    && DEBIAN_FRONTEND=noninteractive \ \n \
    apt-get install \ \n \
        -y --no-install-recommends \ \n \
        texlive-latex-base \ \n \
        texlive-latex-extra \ \n \
        texlive-fonts-recommended \ \n \
        texlive-lang-cyrillic \
"

.image:
	$(eval TMP := $(shell mktemp))
	@echo $(DOCKERFILE) > $(TMP)
	@docker build -q -f $(TMP) -t cv:latest .
	@rm -rf $(TMP)

build: .image
	@docker run \
		--rm \
		-v`pwd`:/usr/src \
		--workdir /usr/src \
		cv:latest \
		npm run build:cv
