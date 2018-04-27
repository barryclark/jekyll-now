require 'jekyll-language-plugin'
require 'securerandom'

module Jekyll
  module LanguagePlugin
    module Loaders
      class CustomDataLoader < BaseLoader
        attr_reader :data

        def initialize(site)
          super
          @data = Hash.new
        end

        def loaded?(language)
          loaded = @data.has_key?(language)
        end

        def load(language)
          return true if loaded?(language)

          !!@data.merge!({
            language => {
              'custom_test' => "String #{SecureRandom.hex} in #{language.capitalize}."
            }
          })
        end

        def get(key, language)
          return nil unless loaded?(language)

          traverse_hash(@data, resolve_dot_notation([language, key]))
        end
      end
    end
  end
end

Jekyll::LanguagePlugin.register_loader(Jekyll::LanguagePlugin::Loaders::CustomDataLoader)
