# frozen_string_literal: true

describe "collections" do
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

  let(:first_response) { last_response_parsed.first }

  context "collection index" do
    it "returns the collection index" do
      get "/collections"
      expect(last_response).to be_ok
      expect(first_response["label"]).to eq("posts")
      expect(first_response["content"]).to be_nil
    end

    it "doesn't include documents" do
      get "/collections"
      expect(last_response).to be_ok
      expect(first_response).to_not have_key("documents")
      expect(first_response).to_not have_key("docs")
    end
  end

  context "an individual collection" do
    it "returns an individual collection" do
      get "/collections/posts"
      expect(last_response).to be_ok
      expect(last_response_parsed["label"]).to eq("posts")
    end

    it "doesn't includes documents" do
      get "/collections/posts"
      expect(last_response).to be_ok
      expect(last_response_parsed).to_not have_key("docs")
      expect(last_response_parsed).to_not have_key("documents")
    end

    context "entries" do
      let(:entries) { last_response_parsed }
      let(:documents) do
        entries.reject do |entry|
          entry.key? "type"
        end
      end
      let(:first_document) { documents.first }

      it "sorts documents by date reverse chronologically" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expected = "2016-03-01"
        expect(first_document["date"].split(" ").first).to eq(expected)
      end

      it "doesn't include document content" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expect(first_document).to_not have_key("raw_content")
        expect(first_document).to_not have_key("content")
      end

      it "includes front matter defaults" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expect(first_document.key?("all")).to eq(true)
      end

      it "doesn't include the raw front matter" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expect(first_document).to_not have_key("front_matter")
      end

      it "doesn't include next/previous" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expect(first_document).to_not have_key("next")
        expect(first_document).to_not have_key("previous")
      end

      it "lists directories" do
        get "/collections/posts/entries/"
        expect(last_response).to be_ok
        expect(entries.first["type"]).to eq("directory")
        expect(entries.first["name"]).to eq("more posts")
        expect(entries.first["path"]).to eq("more posts")
      end

      it "lists documents in subdirectories" do
        get "/collections/posts/entries/more%20posts/some%20more%20posts/"
        expect(last_response).to be_ok
        expect(first_document["id"]).to eq("/2016/05/02/another-test-post-within-subdirectory")
        expect(first_document["path"])
          .to eq(
            "_posts/more posts/some more posts/2016-05-02-another-test-post-within-subdirectory.md"
          )
      end

      it "lists directories in subdirectories" do
        get "/collections/posts/entries/more%20posts"
        expect(last_response).to be_ok
        expect(entries.first["type"]).to eq("directory")
        expect(entries.first["name"]).to eq("some more posts")
        expect(entries.first["path"]).to eq("more posts/some more posts")
      end
    end
  end

  it "404s for an unknown collection" do
    get "/collections/foo"
    expect(last_response.status).to eql(404)
  end

  context "getting a single document" do
    it "returns a collection document" do
      get "/collections/posts/2016-01-01-test-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq("Test Post")
    end

    it "returns a collection document in subdirectories" do
      get "/collections/posts/more%20posts/2016-04-01-post-within-subdirectory.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq("Post Within Subdirectory")
    end

    it "returns a collection document using the slashed ID" do
      get "/collections/posts/2016-01-01-test-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["title"]).to eq("Test Post")
    end

    it "returns a non-dated document" do
      get "/collections/puppies/rover.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["breed"]).to eq("Golden Retriever")
    end

    it "returns `name` field" do
      get "/collections/puppies/rover.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("rover.md")
    end

    it "returns the rendered output" do
      get "/collections/posts/2016-01-01-test-post.md"
      expect(last_response).to be_ok
      expected = "<h1 id=\"test-post\">Test Post</h1>\n"
      expect(last_response_parsed["content"]).to eq(expected)
    end

    it "returns the raw content" do
      get "/collections/posts/2016-01-01-test-post.md"
      expect(last_response).to be_ok
      expect(last_response_parsed["raw_content"]).to eq("# Test Post\n")
    end

    %w(next previous).each do |direction|
      it "includes the #{direction} document non-recursively" do
        get "/collections/posts/2016-02-01-test-post-2.md"
        expect(last_response).to be_ok
        expect(last_response_parsed).to have_key(direction)
        expect(last_response_parsed[direction]).to_not have_key("next")
        expect(last_response_parsed[direction]).to_not have_key("previous")
      end

      it "doesn't include the #{direction} document's content" do
        get "/collections/posts/2016-02-01-test-post-2.md"
        expect(last_response).to be_ok
        expect(last_response_parsed).to have_key(direction)
        expect(last_response_parsed[direction]).to_not have_key("content")
        expect(last_response_parsed[direction]).to_not have_key("raw_content")
        expect(last_response_parsed[direction]).to_not have_key("output")
      end
    end

    context "front matter" do
      let(:front_matter) { last_response_parsed["front_matter"] }

      it "contains front matter defaults" do
        get "/collections/posts/2016-01-01-test-post.md"
        expect(last_response_parsed.key?("all")).to eql(true)
      end

      it "contains raw front matter" do
        get "/collections/posts/2016-01-01-test-post.md"
        expect(last_response_parsed.key?("front_matter")).to eql(true)
        expect(front_matter["foo"]).to eql("bar")
      end

      it "raw front matter doesn't contain defaults" do
        get "/collections/posts/2016-01-01-test-post.md"
        expect(front_matter.key?("some_front_matter")).to eql(false)
      end
    end

    it "404s for an unknown document" do
      get "/collections/posts/foo"
      expect(last_response.status).to eql(404)
    end

    it "404s for an unknown collection and document" do
      get "/collections/foo/bar"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new file without front matter" do
    delete_file "_posts/2016-01-01-test2.md"

    request = {
      :front_matter => {},
      :raw_content  => "test",
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "writes a new file with front matter" do
    delete_file "_posts/2016-01-01-test2.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "writes a new file in subdirectories" do
    delete_file "_posts/more posts/2016-01-01-test2.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }
    put "/collections/posts/more%20posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_posts/more posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/more posts/2016-01-01-test2.md"
  end

  it "updates a file" do
    write_file "_posts/2016-01-01-test2.md"

    request = {
      :path         => "_posts/2016-01-01-test2.md",
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
    }
    put "/collections/posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")
    expect("_posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/2016-01-01-test2.md"
  end

  it "updates a file in subdirectories" do
    write_file "_posts/more posts/2016-01-01-test2.md"

    request = {
      :path         => "_posts/more posts/2016-01-01-test2.md",
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
    }
    put "/collections/posts/more%20posts/2016-01-01-test2.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")
    expect("_posts/more posts/2016-01-01-test2.md").to be_an_existing_file

    delete_file "_posts/more posts/2016-01-01-test2.md"
  end

  it "writes a new file with a future date" do
    future_date = Date.today + 7
    delete_file "_posts/#{future_date}-test.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }
    put "/collections/posts/#{future_date}-test.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("_posts/#{future_date}-test.md").to be_an_existing_file

    delete_file "_posts/#{future_date}-test.md"
  end

  context "renaming a file" do
    it "renames a file" do
      write_file "_posts/2016-01-01-test2.md"
      delete_file "_posts/2016-01-02-test2.md"

      path = "_posts/2016-01-02-test2.md"
      request = {
        :path         => path,
        :front_matter => { :foo => "bar2" },
        :raw_content  => "test",
      }

      put "/collections/posts/2016-01-01-test2.md", request.to_json
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar2")

      get "/collections/posts/2016-01-02-test2.md", request.to_json
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar2")

      expect("_posts/2016-01-01-test2.md").to_not be_an_existing_file
      expect("_posts/2016-01-02-test2.md").to be_an_existing_file

      delete_file "_posts/2016-01-01-test2.md"
      delete_file "_posts/2016-01-02-test2.md"
    end

    it "renames a file in subdirectories" do
      write_file "_posts/more posts/2016-01-01-test2.md"
      delete_file "_posts/more posts/2016-01-02-test2.md"

      path = "_posts/more posts/2016-01-02-test2.md"
      request = {
        :path         => path,
        :front_matter => { :foo => "bar2" },
        :raw_content  => "test",
      }

      put "/collections/posts/more%20posts/2016-01-01-test2.md", request.to_json
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar2")

      get "/collections/posts/more%20posts/2016-01-02-test2.md", request.to_json
      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eq("bar2")

      expect("_posts/more posts/2016-01-01-test2.md").to_not be_an_existing_file
      expect("_posts/more posts/2016-01-02-test2.md").to be_an_existing_file

      delete_file(
        "_posts/more posts/2016-01-01-test2.md",
        "_posts/more posts/2016-01-02-test2.md"
      )
    end
  end

  it "deletes a file" do
    write_file "_posts/2016-01-01-test2.md"
    delete "/collections/posts/2016-01-01-test2.md"
    expect(last_response).to be_ok
    expect("_posts/2016-01-01-test2.md").to_not be_an_existing_file
  end

  it "deletes a file in subdirectories" do
    write_file "_posts/more posts/some more posts/2017-01-01-test.md"
    delete "/collections/posts/more%20posts/some%20more%20posts/2017-01-01-test.md"
    expect(last_response).to be_ok
    expect("_posts/more posts/some more posts/2017-01-01-test.md")
      .to_not be_an_existing_file
    delete_file "_posts/more posts/some more posts/2017-01-01-test.md"
  end
end
