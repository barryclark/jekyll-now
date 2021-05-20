# frozen_string_literal: true

describe "static_files" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  context "index" do
    it "returns the index" do
      get "/static_files"
      expect(last_response).to be_ok
      expect(last_response_parsed.last["path"]).to eql("/index.html")
      expect(last_response_parsed.last["relative_path"]).to eql("index.html")
    end

    it "doesn't include the encoded content" do
      get "/static_files"
      expect(last_response).to be_ok
      expect(last_response_parsed.first).to_not have_key("encoded_content")
    end
  end

  it "returns a single static file" do
    get "/static_files/assets/static-file.txt"
    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/assets/static-file.txt")
    expect(last_response_parsed["encoded_content"]).to eql("VEVTVAo=\n")
  end

  it "404s when a static file doesn't exist" do
    get "/static_files/404.txt"
    expect(last_response.status).to eql(404)
  end

  it "returns a deep directory listing" do
    files = ["/static-dir/file.txt", "/static-dir/foo/file2.txt"]
    files.each { |f| write_file f, "test" }

    get "/static_files/static-dir"
    expect(last_response).to be_ok

    expect(last_response_parsed.first["name"]).to eql("foo")
    expect(last_response_parsed.last["name"]).to eql("file.txt")
    delete_file(*files)
  end

  it "writes a static file" do
    delete_file "static-file-new.txt", "test"

    request = { :encoded_content => "dGVzdA==" }
    put "/static_files/static-file-new.txt", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file-new.txt")
    expect(last_response_parsed["encoded_content"]).to eql("dGVzdA==\n")
    expect("static-file-new.txt").to be_an_existing_file

    delete_file "static-file-new.txt"
  end

  it "writes a static file with raw content" do
    delete_file "static-file-new.txt", "test"

    request = { :raw_content => "test" }
    put "/static_files/static-file-new.txt", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file-new.txt")
    expect(last_response_parsed["encoded_content"]).to eql("dGVzdA==\n")
    expect("static-file-new.txt").to be_an_existing_file

    delete_file "static-file-new.txt"
  end

  it "deeply writes a static file" do
    delete_file "static-dir/file-new.txt"

    request = { :encoded_content => "dGVzdA==" }
    put "/static_files/static-dir/file-new.txt", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-dir/file-new.txt")
    expect(last_response_parsed["encoded_content"]).to eql("dGVzdA==\n")
    expect("static-dir/file-new.txt").to be_an_existing_file

    delete_file "static-dir/file-new.txt"
  end

  it "updates a static file" do
    write_file "static-file-update.txt", "test2"

    request = { :encoded_content => "dGVzdDI=" }
    put "/static_files/static-file-update.txt", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-file-update.txt")
    expect(last_response_parsed["encoded_content"]).to eql("dGVzdDI=\n")
    expect("static-file-update.txt").to be_an_existing_file
    delete_file "static-file-update.txt"
  end

  it "deeply updates a static file" do
    write_file "static-dir/static-file-update.txt", "test"

    request = { :body => "test" }
    put "/static_files/static-dir/static-file-update.txt", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["extname"]).to eql(".txt")
    expect(last_response_parsed["path"]).to eql("/static-dir/static-file-update.txt")
    expect("static-dir/static-file-update.txt").to be_an_existing_file

    delete_file "static-dir/static-file-update.txt"
  end

  it "renames a static file" do
    write_file "static-file-rename.txt", "test2"

    request = {
      :encoded_content => "dGVzdDI=",
      :path            => "static-file-rename2.txt",
    }
    put "/static_files/static-file-rename.txt", request.to_json

    expect(last_response).to be_ok
    expect("static-file-rename.txt").to_not be_an_existing_file
    expect("static-file-rename2.txt").to be_an_existing_file

    delete_file "static-file-rename2.txt"
  end

  it "deletes a static_file" do
    write_file "static-file-delete.txt", "test"
    delete "/static_files/static-file-delete.txt"
    expect(last_response).to be_ok
    expect("static-file-delete.txt").to_not be_an_existing_file
  end

  it "deeply deletes a static_file" do
    write_file "static-dir/static-file-delete.txt", "test"
    delete "/static_files/static-dir/static-file-delete.txt"
    expect(last_response).to be_ok
    expect("static-dir/static-file-delete.txt").to_not be_an_existing_file
  end
end
