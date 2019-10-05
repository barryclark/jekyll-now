# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "texture"
  spec.version       = "0.3"
  spec.authors       = ["Samarjeet"]
  spec.email         = ["thelehhman@gmail.com"]

  spec.summary       = "A configurable jekyll theme for simply beautiful blogs."
  spec.homepage      = "https://github.com/thelehhman/texture"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|404.html)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.0.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6.1"

  spec.add_development_dependency "bundler", "> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
