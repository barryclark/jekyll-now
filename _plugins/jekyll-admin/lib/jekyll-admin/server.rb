# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    ROUTES = %w(collections configuration data drafts pages static_files).freeze
    include JekyllAdmin::PathHelper
    include JekyllAdmin::FileHelper

    register Sinatra::Namespace

    configure :development do
      register Sinatra::Reloader
      enable :logging
    end

    configure :development, :test do
      require "sinatra/cross_origin"
      register Sinatra::CrossOrigin
      enable  :cross_origin
      disable :allow_credentials
      set :allow_methods, [:delete, :get, :options, :post, :put]
    end

    get "/" do
      json ROUTES.map { |r| ["#{r}_api", URI.join(base_url, "/_api/", r)] }.to_h
    end

    # CORS preflight
    options "*" do
      render_404 unless settings.development? || settings.test?
      status 204
    end

    private

    def json(object, options = {})
      content_type :json
      JSON.pretty_generate(object, options)
    end

    def site
      JekyllAdmin.site
    end

    def render_404
      status 404
      content_type :json
      halt
    end

    def request_payload
      @request_payload ||= if request_body.to_s.empty?
                             {}
                           else
                             JSON.parse(request_body)
                           end
    end

    def base_url
      "#{request.scheme}://#{request.host_with_port}"
    end

    def front_matter
      request_payload["front_matter"]
    end

    def document_body
      body = +""
      body << if front_matter && !front_matter.empty?
                YAML.dump(restored_front_matter).strip
                  .gsub(": 'null'", ": null") # restore null values
              else
                "---"
              end
      body << "\n---\n\n"
      body << request_payload["raw_content"].to_s
      body << "\n" unless body.end_with?("\n")
      body
    end
    alias_method :page_body, :document_body

    def request_body
      @request_body ||= begin
        request.body.rewind
        request.body.read
      end
    end

    def namespace
      namespace = request.path_info.split("/")[1].to_s.downcase
      namespace if ROUTES.include?(namespace)
    end

    # verbose 'null' values in front matter
    def restored_front_matter
      front_matter.map do |key, value|
        value = "null" if value.nil?
        [key, value]
      end.to_h
    end
  end
end

# load individual route configurations
JekyllAdmin::Server::ROUTES.each { |name| require_relative File.join("server", name) }

# load namespaces outside route configurations
require_relative "server/site_meta"
