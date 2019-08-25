# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hydejack"
  spec.version       = "7.5.2"
  spec.authors       = ["Florian Klampfer"]
  spec.email         = ["mail@qwtel.com"]

  spec.summary       = %q{A Jekyll theme with JavaScript powers. "Best theme by a mile". Combines the best of static sites and web apps.}
  spec.homepage      = "https://qwtel.com/hydejack/"
  spec.license       = "GPL-3.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.required_ruby_version = "~> 2.1"

  spec.add_runtime_dependency "jekyll", "~> 3.6"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
