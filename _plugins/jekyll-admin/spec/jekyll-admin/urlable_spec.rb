# frozen_string_literal: true

describe JekyllAdmin::URLable do
  subject { JekyllAdmin.site.pages.first }
  let(:scheme) { "http" }
  let(:host) { "localhost" }
  let(:port) { "4000" }
  let(:prefix) { "_api" }
  let(:url_base) { "#{scheme}://#{host}:#{port}" }

  it "knows the host" do
    expect(subject.send(:host)).to eql("localhost")
  end

  it "knows the port" do
    expect(subject.send(:port)).to eql("4000")
  end

  it "knows the scheme" do
    expect(subject.send(:scheme)).to eql("http")
  end

  context "pages" do
    subject { JekyllAdmin.site.pages.find(&:html?) }
    let(:http_url) { "#{url_base}/page.html" }
    let(:api_url) { "#{url_base}/#{prefix}/pages/page.md" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end

  context "posts" do
    subject { JekyllAdmin.site.posts.docs[4] }
    let(:http_url) { "#{url_base}/2016/01/01/test-post.html" }
    let(:api_url) { "#{url_base}/#{prefix}/collections/posts/2016-01-01-test-post.md" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end

  context "drafts" do
    subject { JekyllAdmin.site.posts.docs.find_all(&:draft?)[1] }
    let(:api_url) { "#{url_base}/#{prefix}/drafts/draft-dir/another-draft-post.md" }

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end

  context "documents in an unwritten collection" do
    subject { JekyllAdmin.site.collections["puppies"].docs.first }
    let(:http_url) { nil }
    let(:api_url) { "#{url_base}/#{prefix}/collections/puppies/rover.md" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end

  context "collections" do
    subject { JekyllAdmin.site.collections["posts"] }
    let(:http_url) { nil }
    let(:api_url) { "#{url_base}/#{prefix}/collections/posts" }
    let(:entries_url) { "#{api_url}/entries" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end

    it "knows the entries url" do
      expect(subject.entries_url).to eql(entries_url)
    end
  end

  context "data files" do
    subject { JekyllAdmin::DataFile.all.find { |file| file.id == "data_file.yml" } }
    let(:http_url) { nil }
    let(:api_url) { "#{url_base}/#{prefix}/data/data_file.yml" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end

  context "static files" do
    subject { JekyllAdmin.site.static_files.first }
    let(:http_url) { "#{url_base}/assets/images/icon-github.svg" }
    let(:api_url) { "#{url_base}/#{prefix}/static_files/assets/images/icon-github.svg" }

    it "knows the HTTP URL" do
      expect(subject.http_url).to eql(http_url)
    end

    it "knows the API URL" do
      expect(subject.api_url).to eql(api_url)
    end
  end
end
