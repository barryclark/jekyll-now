# frozen_string_literal: true

module JekyllAdmin
  class Directory
    extend Forwardable
    def_delegator :@path, :basename, :name
    def_delegator :@path, :mtime, :modified_time
    attr_reader :path, :splat, :content_type, :base

    include Enumerable
    include JekyllAdmin::URLable
    include JekyllAdmin::APIable

    RESOURCE_TYPES  = %w(pages data drafts static_files).freeze
    DOT_DIRECTORIES = [".", ".."].freeze

    private_constant :RESOURCE_TYPES, :DOT_DIRECTORIES

    # Parameters:
    #   path - The full path of the directory at which its entries will be listed.
    #
    # Named parameters:
    #           base: - The full path to the directory from source.
    #          splat: - The requested directory path relative to content namespace.
    #   content_type: - The type of the requested directory entries. Corresponds to
    #                   the resources' API namespace.
    def initialize(path, base:, splat:, content_type:)
      @path  = Pathname.new path
      @base  = Pathname.new base
      @splat = Pathname.new splat
      @content_type = content_type
    end

    def to_liquid
      {
        "name"          => name,
        "modified_time" => modified_time,
        "path"          => relative_path,
        "type"          => "directory",
      }
    end

    def relative_path
      @relative_path ||= path.relative_path_from(base).to_s
    end

    def resource_path
      if RESOURCE_TYPES.include?(content_type)
        "/#{content_type}/#{splat}/#{name}"
      else
        "/collections/#{content_type}/entries/#{splat}/#{name}"
      end
    end
    alias_method :url, :resource_path

    def http_url
      nil
    end

    def directories
      path.entries.map do |entry|
        next if DOT_DIRECTORIES.include? entry.to_s
        next unless path.join(entry).directory?

        self.class.new(
          path.join(entry),
          :base => base, :content_type => content_type, :splat => splat
        )
      end.compact!
    end
  end
end
