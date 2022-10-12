# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-simplex"
  spec.version       = "0.9.8.15"
  spec.authors       = ["Ondrej Golasowski"]
  spec.email         = ["golasowski.o@gmail.com"]

  spec.summary       = "An original theme for golasblog project."
  spec.homepage      = "https://github.com/andreondra/jekyll-theme-simplex"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.0"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.0"
end
