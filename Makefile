STORYBOOK_DOCKERFILE	:= infra/docker/storybook/Dockerfile
STORYBOOK_NAME	   	 	:= smartbcity/e2-storybook
STORYBOOK_IMG	    	:= ${STORYBOOK_NAME}:${VERSION}
STORYBOOK_LATEST		:= ${STORYBOOK_NAME}:latest

test:
	@echo 'No test yet'

package: package-libs package-storybook

push: push-storybook push-libs

push-latest: push-latest-storybook

package-libs:
	@yarn install
	@yarn workspace @smartb/g2-themes run build
	@yarn workspace @smartb/g2-components run build
	@yarn workspace @smartb/g2-forms run build
	@yarn workspace @smartb/g2-documentation run build
	@yarn workspace @smartb/g2-layout run build
	@yarn workspace @smartb/g2-providers run build
	@yarn workspace @smartb/g2-s2 run build

push-libs:
	#@lerna publish from-git

push-latest-libs:
	@docker tag ${STORYBOOK_IMG} ${STORYBOOK_LATEST}
	@docker push ${STORYBOOK_LATEST}

package-storybook:
	@docker build -f ${STORYBOOK_DOCKERFILE} -t ${STORYBOOK_IMG} .

push-storybook:
	@docker push ${STORYBOOK_IMG}

push-latest-storybook:
	@docker tag ${STORYBOOK_IMG} ${STORYBOOK_LATEST}
	@docker push ${STORYBOOK_LATEST}
