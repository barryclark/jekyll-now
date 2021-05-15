# frozen_string_literal: true

module Jekyll
  module Commands
    class Serve < Command
      class << self
        private

        def start_up_webrick(opts, destination)
          @reload_reactor.start(opts) if opts["livereload"]

          @server = WEBrick::HTTPServer.new(webrick_opts(opts)).tap { |o| o.unmount("") }
          @server.mount(opts["baseurl"].to_s, Servlet, destination, file_handler_opts)

          jekyll_admin_monkey_patch

          Jekyll.logger.info "Server address:", server_address(@server, opts)
          launch_browser @server, opts if opts["open_url"]
          boot_or_detach @server, opts
        end

        def jekyll_admin_monkey_patch
          @server.mount "/admin", Rack::Handler::WEBrick, JekyllAdmin::StaticServer
          @server.mount "/_api",  Rack::Handler::WEBrick, JekyllAdmin::Server
          Jekyll.logger.info "JekyllAdmin mode:", ENV["RACK_ENV"] || "production"
        end
      end
    end
  end
end
