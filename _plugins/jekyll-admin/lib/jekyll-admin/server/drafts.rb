# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/drafts" do
      get "/*?/?:path.:ext" do
        ensure_requested_file
        json requested_file.to_api(:include_content => true)
      end

      get "/?*" do
        ensure_directory
        json entries.map(&:to_api)
      end

      put "/*?/?:path.:ext" do
        ensure_html_content

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

      delete "/*?/?:path.:ext" do
        ensure_requested_file
        delete_file path
        content_type :json
        status 200
        halt
      end

      private

      # return all documents in the 'posts' collection that output to an html
      # file but reside in a separate directory, `<source_dir>/_drafts/`
      def drafts
        posts = site.collections.find { |l, _c| l == "posts" }
        posts[1].docs.find_all { |d| d.output_ext == ".html" && d.draft? } if posts
      end

      # return drafts at the same level as directory
      def directory_drafts
        drafts.find_all { |d| File.dirname(d.path) == directory_path }
      end

      def reverse_sorted_drafts
        directory_drafts.sort_by(&:date).reverse
      end

      # returns directories at the root of `/_drafts/` that contain drafts
      def relevant_directory_paths
        drafts.map { |doc| relative_draft_path(doc).split("/")[0] }.uniq
      end

      def relative_draft_path(document)
        File.dirname(document.relative_path.sub("_drafts/", ""))
      end

      def ensure_directory
        ensure_drafts
        render_404 unless Dir.exist?(directory_path)
      end

      def ensure_drafts
        render_404 if drafts.nil?
      end

      def ensure_html_content
        return if html_content?

        content_type :json
        halt 422, json("error_message" => "Invalid file extension for drafts")
      end

      def entries
        args = {
          :base         => site.in_source_dir("_drafts"),
          :content_type => "drafts",
          :splat        => params["splat"].first,
        }
        # get the directories inside the requested directory
        directory = JekyllAdmin::Directory.new(directory_path, **args)
        directories = directory.directories

        # exclude root level directories which do not have drafts
        if params["splat"].first.empty?
          directories = directories.select do |d|
            relevant_directory_paths.include? d.name.to_s
          end
        end
        # merge directories with the drafts at the same level
        directories.concat(reverse_sorted_drafts)
      end

      def html_content?
        draft = Jekyll::PageWithoutAFile.new(
          site,
          site.source,
          "_drafts",
          request_payload["path"] || filename
        )
        draft.data = request_payload["front_matter"]
        draft.html?
      end
    end
  end
end
