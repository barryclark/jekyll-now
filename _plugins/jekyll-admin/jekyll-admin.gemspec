# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "jekyll-admin/version"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-admin"
  spec.version       = JekyllAdmin::VERSION
  spec.authors       = ["Mert Kahyaoğlu", "GitHub Open Source"]
  spec.email         = ["mertkahyaoglu93@gmail.com", "opensource@github.com"]

  spec.summary       = "wp-admin for Jekyll, but better"
  spec.description   = "Jekyll::Admin is a drop in administrative framework for Jekyll sites."
  spec.homepage      = "https://github.com/jekyll/jekyll-admin"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files         = Dir.glob("lib/**/*").concat(%w(LICENSE README.md))
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r!^exe/!) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 2.3.0"

  spec.add_dependency "jekyll", ">= 3.7", "< 5.0"
  spec.add_dependency "sinatra", "~> 1.4"
  spec.add_dependency "sinatra-contrib", "~> 1.4"

  spec.add_development_dependency "bundler", ">= 1.7"
  spec.add_development_dependency "gem-release", "~> 0.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.4"
  spec.add_development_dependency "rubocop-jekyll", "~> 0.10.0"
  spec.add_development_dependency "sinatra-cross_origin", "~> 0.3"
end
