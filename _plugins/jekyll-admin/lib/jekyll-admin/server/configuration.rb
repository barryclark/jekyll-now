# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/configuration" do
      get do
        json(
          :content     => parsed_configuration,
          :raw_content => raw_configuration
        )
      end

      put do
        write_file(configuration_path, configuration_body)
        json request_payload
      end

      private

      def overrides
        @overrides ||= {
          "source" => sanitized_path("/"),
        }
      end

      # Computed configuration, with updates and defaults
      # Returns an instance of Jekyll::Configuration
      def configuration
        @configuration ||= site.config.merge(overrides)
      end

      # Configuration data, as read by Jekyll
      def parsed_configuration
        configuration.read_config_file(configuration_path)
      end

      # Raw configuration content, as it sits on disk
      def raw_configuration
        File.read(
          configuration_path,
          **Jekyll::Utils.merged_file_read_opts(site, {})
        )
      end

      # Returns the path to the *first* config file discovered
      def configuration_path
        sanitized_path configuration.config_files(overrides).first
      end

      # The user's uploaded configuration for updates
      # Instead of extracting `raw_content` directly from the `request_payload`,
      #   assign the data to a new variable and then extract the `raw_content`
      #   from it to circumvent CORS violation in `development` mode.
      def configuration_body
        payload = request_payload
        payload["raw_content"]
      end
    end
  end
end
