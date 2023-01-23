# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hydejack"
  spec.version       = "9.1.6"
  spec.authors       = ["Florian Klampfer"]
  spec.email         = ["mail@qwtel.com"]

  spec.summary       = %q{"A boutique Jekyll theme for hackers, nerds, and academics"}
  spec.homepage      = "https://hydejack.com/"
  spec.license       = "GPL-3.0"
  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/hydecorp/hydejack/issues",
    "changelog_uri"     => "https://hydejack.com/changelog/",
    "documentation_uri" => "https://hydejack.com/docs/",
    "homepage_uri"      => "https://hydejack.com/",
    "source_code_uri"   => "https://github.com/hydecorp/hydejack/",
    "github_repo"       => "ssh://github.com/hydecorp/hydejack"
  }

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|_config.yml|README|LICENSE|NOTICE|CHANGELOG)}i) }

  spec.required_ruby_version = ">= 2.6"

  spec.add_runtime_dependency "jekyll", ">= 3.8", "< 5.0"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.2"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 12.3.3"
end
