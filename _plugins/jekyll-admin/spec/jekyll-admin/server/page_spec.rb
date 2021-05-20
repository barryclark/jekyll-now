# frozen_string_literal: true

describe "pages" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  before(:each) do
    JekyllAdmin.site.process
  end

  after(:each) do
    JekyllAdmin.site.process
  end

  context "page index" do
    let(:entries) { last_response_parsed }
    let(:pages) do
      entries.reject do |entry|
        entry.key? "type"
      end
    end
    let(:first_page) { pages.first }

    it "lists pages" do
      get "/pages"
      expect(last_response).to be_ok
      expect(first_page["name"]).to eq("page.md")
      expect(first_page["relative_path"]).to eq("page.md")

      redirect_page = JekyllAdmin.site.pages.find { |p| p.name == "redirect.html" }
      expect(redirect_page.url).to eql("/webmaster.html")
      expect(entries).to_not include(redirect_page.to_api)
    end

    it "lists directories" do
      get "/pages"
      expect(last_response).to be_ok
      expect(entries.first["type"]).to eq("directory")
      expect(entries.first["name"]).to eq("page-dir")
    end

    it "lists pages in subdirectories" do
      get "/pages/page-dir/test"
      expect(last_response).to be_ok
      expect(first_page["name"]).to eq("page2.md")
      expect(first_page["path"]).to eq("page-dir/test/page2.md")
      expect(first_page["relative_path"]).to eq("page-dir/test/page2.md")
    end

    it "includes front matter defaults" do
      get "/pages"
      expect(last_response).to be_ok
      expect(first_page).to have_key("all")
      expect(first_page).to have_key("page_only")
    end

    it "doesn't include the raw front matter" do
      get "/pages"
      expect(last_response).to be_ok
      expect(last_response_parsed.first).to_not have_key("front_matter")
    end

    it "doesn't include the page content" do
      get "/pages"
      expect(last_response).to be_ok
      expect(last_response_parsed.first).to_not have_key("content")
      expect(last_response_parsed.first).to_not have_key("raw_content")
    end

    it "doesn't include non-html pages" do
      get "/pages"
      expect(last_response).to be_ok
      paths = last_response_parsed.map { |page| page["path"] }
      expect(paths).to_not include("assets/app.cofee")
      expect(paths).to_not include("assets/style.scss")
    end
  end

  context "getting a single page" do
    it "returns a page" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar")
    end

    it "returns a page in subdirectories" do
      get "/pages/page-dir/page1.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar")
    end

    it "returns the rendered output" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expected = "<h1 id=\"test-page\">Test Page</h1>\n"
      expect(last_response_parsed["content"]).to eq(expected)
    end

    it "returns the raw content" do
      get "/pages/page.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Test Page\n")
    end

    context "front matter" do
      let(:front_matter) { last_response_parsed["front_matter"] }

      it "contains front matter defaults" do
        get "/pages/page.md"
        expect(last_response_parsed.key?("all")).to eql(true)
        expect(last_response_parsed.key?("page_only")).to eql(true)
      end

      it "contains raw front matter" do
        get "/pages/page.md"
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(front_matter["foo"]).to eql("bar")
      end

      it "raw front matter doesn't include defaults" do
        get "/pages/page.md"
        expect(front_matter.key?("all")).to eql(false)
      end
    end

    it "404s for an unknown page" do
      get "/pages/foo.md"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new page without front matter" do
    delete_file "page-new.md"

    request = {
      :front_matter => {},
      :raw_content  => "test",
      :path         => "page-new.md",
    }
    put "/pages/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect("page-new.md").to be_an_existing_file

    delete_file "page-new.md"
  end

  it "writes a new page with front matter" do
    delete_file "page-new.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-new.md",
    }
    put "/pages/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-new.md").to be_an_existing_file

    delete_file "page-new.md"
  end

  it "writes a new page in subdirectories" do
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-dir/page-new.md",
    }
    put "/pages/page-dir/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-dir/page-new.md").to be_an_existing_file

    delete_file "page-dir/page-new.md"
  end

  it "does not writes a non html page" do
    expected_error = "Invalid file extension for pages"
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-new.txt",
    }
    put "/pages/page-new.txt", request.to_json

    expect(last_response).to be_unprocessable
    expect(last_response_parsed["error_message"]).to eq(expected_error)
    expect("page-new.md").to_not be_an_existing_file
  end

  it "updates a page" do
    write_file "page-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "page-update.md",
    }
    put "/pages/page-update.md", request.to_json
    expect("page-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "page-update.md"
  end

  it "updates a page in subdirectories" do
    write_file "page-dir/page-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "page-dir/page-update.md",
    }
    put "/pages/page-dir/page-update.md", request.to_json
    expect("page-dir/page-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "page-dir/page-update.md"
  end

  it "renames a page" do
    write_file  "page-rename.md"
    delete_file "page-renamed.md"

    request = {
      :path         => "page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-rename.md").to_not be_an_existing_file
    expect("page-renamed.md").to be_an_existing_file

    get "/pages/page-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "page-rename.md", "page-renamed.md"
  end

  it "renames a page in subdirectories" do
    write_file  "page-dir/page-rename.md"
    delete_file "page-dir/page-renamed.md"

    request = {
      :path         => "page-dir/page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-dir/page-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-dir/page-rename.md").to_not be_an_existing_file
    expect("page-dir/page-renamed.md").to be_an_existing_file

    get "/pages/page-dir/page-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "page-dir/page-rename.md", "page-dir/page-renamed.md"
  end

  it "404s when trying to rename a non-existent page" do
    request = {
      :path         => "page-dir/page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-dir/invalid-page.md", request.to_json
    expect(last_response.status).to eql(404)
    expect("page-dir/page-renamed.md").to_not be_an_existing_file
  end

  it "deletes a page" do
    path = write_file "page-delete.md"
    delete "/pages/page-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end

  it "deletes a page in subdirectories" do
    path = write_file "page-dir/page-delete.md"
    delete "/pages/page-dir/page-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
