module Jekyll
  module Commands
    module Watch
      extend self

      def init_with_program(prog)
      end

      # Build your jekyll site
      # Continuously watch if `watch` is set to true in the config.
      def process(options)
        Jekyll.logger.log_level = :error if options['quiet']
        watch(site, options) if options['watch']
      end

      # Watch for file changes and rebuild the site.
      #
      # site - A Jekyll::Site instance
      # options - A Hash of options passed to the command
      #
      # Returns nothing.
      def watch(_site, options)
        Jekyll::Watcher.watch(options)
      end

    end
  end
end
