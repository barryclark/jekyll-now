# frozen_string_literal: true

describe "integration" do
  let(:source) { fixture_path("site") }
  let(:dest) { File.join(source, "_site") }
  let(:args) { ["--detach", "--watch", "--source", source, "--destination", dest] }
  let(:start_command) { %w(bundle exec jekyll serve).concat(args) }
  let(:stop_command) { ["pkill", "-f", "jekyll"] }
  let(:server) { "http://localhost:4000" }
  let(:path) { "/" }
  let(:uri) { URI.join(server, path) }
  let(:response) { Net::HTTP.get_response(uri) }

  before do
    Open3.popen3(*start_command)
    sleep 3
  end

  after { Open3.capture2e(*stop_command) }

  context "Jekyll site" do
    let(:path) { "/" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      expect(response.code).to eql("200")
      expect(response.body).to match("You're probably looking for")
    end
  end

  context "Admin site" do
    let(:path) { "/admin" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      with_index_stubbed do
        expect(response.code).to eql("200")
        expect(response.body).to match("Jekyll Admin")
      end
    end
  end

  context "API" do
    let(:path) { "/_api" }

    it "serves the Jekyll site", :skip => Gem.win_platform? do
      expect(response.code).to eql("200")
      expect(response.body).to match("collections_api")
    end
  end

  context "watching" do
    it "Jekyll isn't watching", :skip => Gem.win_platform? do
      File.open(File.join(source, "page.md"), "a") do |f|
        f.puts "peek-a-boo"
      end
      content = File.read(File.join(source, "page.md"))
      output = File.read(File.join(dest, "page.html"))

      expect(content).to include("peek-a-boo")
      expect(output).not_to include("peek-a-boo")

      File.open(File.join(source, "page.md"), "w+") do |f|
        f.write "---\nfoo: bar\n---\n\n# Test Page\n"
      end
    end
  end
end
