# frozen_string_literal: true

module JekyllAdmin
  class StaticServer < Sinatra::Base
    set :public_dir, File.expand_path("./public", File.dirname(__FILE__))

    MUST_BUILD_MESSAGE = "Front end not yet built. Run `script/build` to build."

    # Allow `/admin` and `/admin/`, and `/admin/*` to serve `/public/dist/index.html`
    get "/*" do
      send_file index_path
    end

    # Provide a descriptive error message in dev. if frontend is not build
    not_found do
      status 404
      MUST_BUILD_MESSAGE if settings.development? || settings.test?
    end

    private

    def index_path
      @index_path ||= File.join(settings.public_folder, "index.html")
    end
  end
end
