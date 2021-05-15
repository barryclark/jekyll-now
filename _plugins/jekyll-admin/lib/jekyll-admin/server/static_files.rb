# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/static_files" do
      # End-point to retrieve all static-files in site
      get "/index" do
        json site.static_files.map(&:to_api)
      end

      # End-point to retrieve individual directories that contain static-files
      get "/?*" do
        render_404 unless File.exist?(path)

        if requested_file
          json requested_file.to_api(:include_content => true)
        else
          json entries.map(&:to_api)
        end
      end

      put "/*" do
        if renamed?
          ensure_requested_file
          delete_file_without_process path
        end

        write_file(write_path, static_file_body)
        json written_file.to_api(:include_content => true)
      end

      delete "/*" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      # returns relative path of root level directories that contain static files
      def dirs_at_root
        static_files.map do |file|
          File.dirname(file.path.sub("#{site.source}/", "")).split("/")[0]
        end.uniq
      end

      def directory_files
        static_files.find_all do |file|
          sanitized_path(File.dirname(file.path)) == directory_path
        end
      end

      def entries
        splat = params["splat"].first
        args = {
          :base         => site.source,
          :content_type => "static_files",
          :splat        => splat,
        }
        # get all directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, **args)
        directories = directory.directories

        # exclude root level directories which do not have static files
        directories = directories.select { |d| dirs_at_root.include? d.name.to_s } if splat.empty?
        directories.concat(directory_files)
      end

      def static_file_body
        raw_content = request_payload["raw_content"]
        return raw_content if raw_content.is_a?(String) && raw_content != ""

        Base64.decode64 request_payload["encoded_content"].to_s
      end

      def static_files
        site.static_files.select { |f| f.path.start_with? site.source }
      end
    end
  end
end
