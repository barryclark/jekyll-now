# frozen_string_literal: true

describe "drafts" do
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

  context "index" do
    let(:entries) { last_response_parsed }
    let(:drafts) do
      entries.reject do |entry|
        entry.key? "type"
      end
    end
    let(:first_draft) { drafts.first }

    it "lists drafts" do
      get "/drafts"
      expect(last_response).to be_ok
      expect(first_draft["name"]).to eq("draft-post.md")
    end

    it "lists directories" do
      get "/drafts"
      expect(last_response).to be_ok
      expect(entries.first["type"]).to eq("directory")
      expect(entries.first["name"]).to eq("draft-dir")
    end

    it "lists drafts in subdirectories" do
      get "/drafts/draft-dir"
      expect(last_response).to be_ok
      expect(first_draft["name"]).to eq("another-draft-post.md")
      expect(first_draft["path"]).to eq("_drafts/draft-dir/another-draft-post.md")
      expect(first_draft["relative_path"]).to eq("draft-dir/another-draft-post.md")
    end

    it "lists directories in subdirectories" do
      get "/drafts/draft-dir"
      expect(last_response).to be_ok
      expect(entries.first["type"]).to eq("directory")
      expect(entries.first["path"]).to eq("draft-dir/WIP")
    end

    it "includes front matter defaults" do
      get "/drafts"
      expect(last_response).to be_ok
      expect(first_draft).to have_key("all")
    end

    it "doesn't include the raw front matter" do
      get "/drafts"
      expect(last_response).to be_ok
      expect(last_response_parsed.first).to_not have_key("front_matter")
    end

    it "doesn't include the draft content" do
      get "/drafts"
      expect(last_response).to be_ok
      expect(last_response_parsed.first).to_not have_key("content")
      expect(last_response_parsed.first).to_not have_key("raw_content")
    end

    it "doesn't include non-html drafts" do
      get "/drafts"
      expect(last_response).to be_ok
      paths = last_response_parsed.map { |draft| draft["path"] }
      expect(paths).to_not include("assets/app.cofee")
      expect(paths).to_not include("assets/style.scss")
    end
  end

  context "getting a single draft" do
    it "returns a draft" do
      get "/drafts/draft-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar")
    end

    it "returns a draft in subdirectories" do
      get "/drafts/draft-dir/another-draft-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar")
    end

    it "returns the rendered output" do
      get "/drafts/draft-post.md"
      expect(last_response).to be_ok
      expected = "<h1 id=\"draft-post\">Draft Post</h1>\n"
      expect(last_response_parsed["content"]).to eq(expected)
    end

    it "returns the raw content" do
      get "/drafts/draft-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Draft Post\n")
    end

    context "front matter" do
      let(:front_matter) { last_response_parsed["front_matter"] }

      it "contains front matter defaults" do
        get "/drafts/draft-post.md"
        expect(last_response_parsed.key?("all")).to eql(true)
      end

      it "contains raw front matter" do
        get "/drafts/draft-post.md"
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(front_matter["foo"]).to eql("bar")
      end

      it "raw front matter doesn't include defaults" do
        get "/drafts/draft-post.md"
        expect(front_matter.key?("all")).to eql(false)
      end
    end

    it "404s for an unknown draft" do
      get "/drafts/foo.md"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new draft without front matter" do
    delete_file "_drafts/draft-new.md"

    request = {
      :front_matter => {},
      :raw_content  => "test",
      :path         => "_drafts/draft-new.md",
    }
    put "/drafts/draft-new.md", request.to_json

    expect(last_response).to be_ok
    expect("_drafts/draft-new.md").to be_an_existing_file

    delete_file "_drafts/draft-new.md"
  end

  it "writes a new draft with front matter" do
    delete_file "_drafts/draft-new.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "_drafts/draft-new.md",
    }
    put "/drafts/draft-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_drafts/draft-new.md").to be_an_existing_file

    delete_file "_drafts/draft-new.md"
  end

  it "writes a new draft in subdirectories" do
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "_drafts/draft-dir/draft-new.md",
    }
    put "/drafts/draft-dir/draft-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_drafts/draft-dir/draft-new.md").to be_an_existing_file

    delete_file "_drafts/draft-dir/draft-new.md"
  end

  it "does not writes a non html draft" do
    expected_error = "Invalid file extension for drafts"
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "_drafts/draft-new.txt",
    }
    put "/drafts/draft-new.txt", request.to_json

    expect(last_response).to be_unprocessable
    expect(last_response_parsed["error_message"]).to eq(expected_error)
    expect("_drafts/draft-new.md").to_not be_an_existing_file
  end

  it "updates a draft" do
    write_file "_drafts/draft-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "_drafts/draft-update.md",
    }
    put "/drafts/draft-update.md", request.to_json
    expect("_drafts/draft-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "_drafts/draft-update.md"
  end

  it "updates a draft in subdirectories" do
    write_file "_drafts/draft-dir/draft-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "_drafts/draft-dir/draft-update.md",
    }
    put "/drafts/draft-dir/draft-update.md", request.to_json
    expect("_drafts/draft-dir/draft-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "_drafts/draft-dir/draft-update.md"
  end

  it "renames a draft" do
    write_file  "_drafts/draft-rename.md"
    delete_file "_drafts/draft-renamed.md"

    request = {
      :path         => "_drafts/draft-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/drafts/draft-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_drafts/draft-rename.md").to_not be_an_existing_file
    expect("_drafts/draft-renamed.md").to be_an_existing_file

    get "/drafts/draft-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "_drafts/draft-rename.md", "_drafts/draft-renamed.md"
  end

  it "renames a draft in subdirectories" do
    write_file  "_drafts/draft-dir/draft-rename.md"
    delete_file "_drafts/draft-dir/draft-renamed.md"

    request = {
      :path         => "_drafts/draft-dir/draft-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/drafts/draft-dir/draft-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_drafts/draft-dir/draft-rename.md").to_not be_an_existing_file
    expect("_drafts/draft-dir/draft-renamed.md").to be_an_existing_file

    get "/drafts/draft-dir/draft-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "_drafts/draft-dir/draft-rename.md", "_drafts/draft-dir/draft-renamed.md"
  end

  it "404s when trying to rename a non-existent draft" do
    request = {
      :path         => "_drafts/draft-dir/draft-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/drafts/draft-dir/invalid-draft.md", request.to_json
    expect(last_response.status).to eql(404)
    expect("_drafts/draft-dir/draft-renamed.md").to_not be_an_existing_file
  end

  it "deletes a draft" do
    path = write_file "_drafts/draft-delete.md"
    delete "/drafts/draft-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end

  it "deletes a draft in subdirectories" do
    path = write_file "_drafts/draft-dir/draft-delete.md"
    delete "/drafts/draft-dir/draft-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
