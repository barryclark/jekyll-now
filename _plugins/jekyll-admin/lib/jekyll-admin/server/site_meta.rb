# frozen_string_literal: true

module JekyllAdmin
  class Server < Sinatra::Base
    # Jekyll::Site instance method names that return a Hash.
    META_KEYS = [:categories, :layouts, :tags].freeze
    private_constant :META_KEYS

    namespace "/site_meta" do
      get "/?" do
        json site_meta
      end

      private

      # Stash a Hash generated with pre-determined keys.
      def site_meta
        @site_meta ||= META_KEYS.zip(META_KEYS.map { |k| site.send(k).keys }).to_h
      end

      # Reset memoization of `#site_meta` when the site regenerates
      Jekyll::Hooks.register(:site, :after_reset) { @site_meta = nil }
    end
  end
end
