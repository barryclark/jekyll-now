# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/collections" do
      get do
        json(site.collections.map { |c| c[1].to_api })
      end

      get "/:collection_id" do
        ensure_collection
        json collection.to_api
      end

      get "/:collection_id/*?/?:path.:ext" do
        ensure_requested_file
        json requested_file.to_api(:include_content => true)
      end

      get "/:collection_id/entries/?*" do
        ensure_directory
        json entries.map(&:to_api)
      end

      put "/:collection_id/*?/?:path.:ext" do
        ensure_collection

        if new?
          ensure_not_overwriting_existing_file
        elsif renamed?
          ensure_requested_file
          ensure_not_overwriting_existing_file
          delete_file_without_process path
        end

        write_file write_path, document_body
        json written_file.to_api(:include_content => true)
      end

      delete "/:collection_id/*?/?:path.:ext" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      def collection
        collection = site.collections.find { |l, _c| l == params["collection_id"] }
        collection[1] if collection
      end

      def document_id
        path = "#{params["splat"].first}/#{filename}"
        path.gsub(%r!(\d{4})/(\d{2})/(\d{2})/(.*)!, '\1-\2-\3-\4')
      end

      def directory_docs
        collection.docs.find_all { |d| File.dirname(d.path) == directory_path }
      end

      def ensure_collection
        render_404 if collection.nil?
      end

      def ensure_directory
        ensure_collection
        render_404 unless Dir.exist?(directory_path)
      end

      def entries
        collections_dir = site.config["collections_dir"]
        collection_id, splats = params.values_at("collection_id", "splat")
        args = {
          :base         => site.in_source_dir(collections_dir, "_#{collection_id}"),
          :content_type => collection_id,
          :splat        => splats&.first,
        }
        # get the directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, **args)
        directories = directory.directories
        # merge directories with the documents at the same level
        directories.concat(directory_docs.sort_by(&:date).reverse)
      end
    end
  end
end
