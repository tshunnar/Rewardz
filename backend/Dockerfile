ARG RUBY_VERSION=3.3.6
FROM docker.io/library/ruby:$RUBY_VERSION AS base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libyaml-dev pkg-config libmariadb-dev-compat libmariadb-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

RUN apt-get update -qq && apt-get install -y build-essential nodejs

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 5678
CMD ["bash", "-c", "rails server -b 0.0.0.0 -p 5678"]