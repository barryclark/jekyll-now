# frozen_string_literal: true

Jekyll::Hooks.register :site, :post_write do |site|
  docs = site.posts.docs.dup
  about = site.pages.find { |page| page.relative_path == "about.md" }
  docs << about if about

  rules = []
  docs.each do |doc|
    url = doc.url.to_s.sub(%r{/\z}, "")
    next if url.empty?

    dest = File.join(site.dest, url.delete_prefix("/") + ".txt")
    FileUtils.mkdir_p(File.dirname(dest))
    File.write(dest, File.read(doc.path))
    rules << "#{url}.md #{url}.txt 301"
  end

  redirects = File.join(site.dest, "_redirects")
  existing = File.exist?(redirects) ? File.read(redirects) : ""
  known = existing.each_line.map { |line| line.split.first }
  fresh = rules.reject { |rule| known.include?(rule.split.first) }
  next if fresh.empty?

  body = existing.strip
  body = body.empty? ? "" : body + "\n"
  File.write(redirects, body + fresh.join("\n") + "\n")
end
