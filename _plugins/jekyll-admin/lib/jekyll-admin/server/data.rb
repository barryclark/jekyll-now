# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    # supported extensions, in order of preference, for now, no .csv
    EXTENSIONS = %w(yml json).freeze

    namespace "/data" do
      get "/*?/?:path.:ext" do
        ensure_requested_file
        json requested_file.to_api(:include_content => true)
      end

      get "/?*" do
        ensure_directory
        json entries.map(&:to_api)
      end

      put "/*?/?:path.:ext" do
        if renamed?
          ensure_requested_file
          delete_file_without_process path
        end

        write_file write_path, data_file_body
        json written_file.to_api(:include_content => true)
      end

      delete "/*?/?:path.:ext" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      # returns relative path of root level directories that contain data files
      def directory_paths
        DataFile.all.map { |p| File.dirname(p.relative_path).split("/")[0] }.uniq
      end

      def directory_pages
        DataFile.all.find_all do |p|
          sanitized_path(File.dirname(p.path)) == directory_path
        end
      end

      def entries
        args = {
          :base         => site.in_source_dir(DataFile.data_dir),
          :content_type => "data",
          :splat        => splats.first,
        }
        # get all directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, **args)
        directories = directory.directories

        # exclude root level directories which do not have data files
        if splats.first.empty?
          directories = directories.select do |d|
            directory_paths.include? d.name.to_s
          end
        end

        # merge directories with the pages at the same level
        directories.concat(directory_pages)
      end

      def data_file_body
        if !request_payload["raw_content"].to_s.empty?
          request_payload["raw_content"]
        elsif !request_payload["content"].to_s.empty?
          YAML.dump(request_payload["content"]).sub(%r!\A---\n!, "")
        end
      end

      def splats
        params["splat"] || ["/"]
      end
    end
  end
end
