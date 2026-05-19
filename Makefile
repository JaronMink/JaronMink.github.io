SHELL := /bin/zsh
.DEFAULT_GOAL := help

CHRUBY_VERSION ?= ruby-3.3.5
CHRUBY_SH ?= /opt/homebrew/opt/chruby/share/chruby/chruby.sh
HOST ?= 127.0.0.1
PORT ?= 4000
LIVERELOAD_PORT ?= 35729

RUBY_SETUP = if [ -f "$(CHRUBY_SH)" ]; then source "$(CHRUBY_SH)" && chruby "$(CHRUBY_VERSION)"; fi

.PHONY: help doctor setup serve serve-live build validate check clean

help:
	@printf "\nHappy Lab website commands\n\n"
	@printf "  make serve          Start Jekyll at http://$(HOST):$(PORT)\n"
	@printf "  make serve-live     Start Jekyll with LiveReload\n"
	@printf "  make build          Run the local Jekyll build\n"
	@printf "  make validate       Validate YAML data files\n"
	@printf "  make check          Run validation and build\n"
	@printf "  make setup          Install/update basic Jekyll gems\n"
	@printf "  make doctor         Show Ruby/Gem/Jekyll versions\n"
	@printf "  make clean          Clean generated Jekyll output\n\n"
	@printf "Tip: use PORT=4002 if another server is already on 4000.\n\n"

doctor:
	@$(RUBY_SETUP) && ruby -v && gem -v && jekyll -v

setup:
	$(RUBY_SETUP) && gem install jekyll rouge

serve:
	$(RUBY_SETUP) && jekyll serve --host $(HOST) --port $(PORT)

serve-live:
	$(RUBY_SETUP) && jekyll serve --host $(HOST) --port $(PORT) --livereload --livereload-port $(LIVERELOAD_PORT)

build:
	$(RUBY_SETUP) && jekyll build

validate:
	$(RUBY_SETUP) && ruby -ryaml -rdate -e 'Dir["_data/*.yml"].each { |path| YAML.safe_load(File.read(path), permitted_classes: [Date], aliases: true) }; puts "YAML data validation passed."'

check: validate build

clean:
	$(RUBY_SETUP) && jekyll clean
