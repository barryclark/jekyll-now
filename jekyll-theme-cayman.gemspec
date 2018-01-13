# encoding: utf-8

Gem::Specification.new do |s|
  s.name          = "jekyll-theme-cayman"
  s.version       = "0.1.0"
  s.license       = "CC0-1.0"
  s.authors       = ["Jason Long", "GitHub, Inc."]
  s.email         = ["opensource+jekyll-theme-cayman@github.com"]
  s.homepage      = "https://github.com/pages-themes/cayman"
  s.summary       = "Cayman is a Jekyll theme for GitHub Pages"

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  s.platform      = Gem::Platform::RUBY
  s.add_runtime_dependency "jekyll", "~> 3.5"
  s.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
end