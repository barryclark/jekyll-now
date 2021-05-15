# frozen_string_literal: true

# Default Sinatra to "production" mode (surpress errors) unless
# otherwise specified by the `RACK_ENV` environmental variable.
# Must be done prior to requiring Sinatra, or we'll get a LoadError
# as it looks for sinatra/cross-origin, which is development only
ENV["RACK_ENV"] = "production" if ENV["RACK_ENV"].to_s.empty?

require "json"
require "jekyll"
require "base64"
require "webrick"
require "sinatra"
require "fileutils"
require "sinatra/base"
require "sinatra/json"
require "addressable/uri"
require "sinatra/reloader"
require "sinatra/namespace"

module JekyllAdmin
  autoload :APIable,      "jekyll-admin/apiable"
  autoload :DataFile,     "jekyll-admin/data_file"
  autoload :Directory,    "jekyll-admin/directory"
  autoload :FileHelper,   "jekyll-admin/file_helper"
  autoload :PathHelper,   "jekyll-admin/path_helper"
  autoload :Server,       "jekyll-admin/server"
  autoload :StaticServer, "jekyll-admin/static_server"
  autoload :URLable,      "jekyll-admin/urlable"
  autoload :Version,      "jekyll-admin/version"

  def self.site
    @site ||= begin
      site = Jekyll.sites.first
      site.future = true
      site
    end
  end
end

[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
  klass.include JekyllAdmin::APIable
  klass.include JekyllAdmin::URLable
end

# Monkey Patches
require_relative "jekyll/commands/serve"
