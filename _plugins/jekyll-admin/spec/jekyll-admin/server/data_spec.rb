# frozen_string_literal: true

describe "data" do
  include Rack::Test::Methods

  let(:base_response) do
    {
      "name"          => "data_file.yml",
      "path"          => "_data/data_file.yml",
      "relative_path" => "data_file.yml",
      "slug"          => "data_file",
      "ext"           => ".yml",
      "title"         => "Data File",
      "api_url"       => "http://localhost:4000/_api/data/data_file.yml",
      "http_url"      => nil,
    }
  end

  let(:response_with_content) do
    base_response.merge(
      "raw_content" => "foo: bar\n",
      "content"     => {
        "foo" => "bar",
      }
    )
  end

  def app
    JekyllAdmin::Server
  end

  it "gets the index" do
    get "/data"
    expect(last_response).to be_ok
    expect(last_response_parsed.find { |file| file["slug"] == "data_file" }).to eql(base_response)
  end

  it "gets an individual data file" do
    get "/data/data_file.yml"
    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(response_with_content)
  end

  it "gets data files in a subdirectory" do
    get "/data/movies"

    expected_response = {
      "name"          => "actors.yml",
      "path"          => "_data/movies/actors.yml",
      "relative_path" => "movies/actors.yml",
      "slug"          => "actors",
      "ext"           => ".yml",
      "title"         => "Actors",
      "api_url"       => "http://localhost:4000/_api/data/movies/actors.yml",
      "http_url"      => nil,
    }

    expect(last_response).to be_ok
    expect(last_response_parsed).to include(expected_response)
  end

  it "gets an individual data file in a subdirectory" do
    get "/data/movies/actors.yml"

    expected_response = {
      "name"          => "actors.yml",
      "path"          => "_data/movies/actors.yml",
      "relative_path" => "movies/actors.yml",
      "slug"          => "actors",
      "ext"           => ".yml",
      "title"         => "Actors",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/movies/actors.yml",
      "http_url"      => nil,
    }

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
  end

  it "writes a new data file when given content" do
    delete_file "_data/data-file-new.yml"

    expected_response = {
      "name"          => "data-file-new.yml",
      "path"          => "_data/data-file-new.yml",
      "relative_path" => "data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar" } }
    put "/data/data-file-new.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-new.yml").to be_an_existing_file

    delete_file "_data/data-file-new.yml"
  end

  it "writes a new data file in subdirectory when given content" do
    delete_file "_data/test-dir/data-file-new.yml"

    expected_response = {
      "name"          => "data-file-new.yml",
      "path"          => "_data/test-dir/data-file-new.yml",
      "relative_path" => "test-dir/data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/test-dir/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar" } }
    put "/data/test-dir/data-file-new.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/test-dir/data-file-new.yml").to be_an_existing_file

    delete_file "_data/test-dir/data-file-new.yml"
  end

  it "writes a new data file when raw content" do
    delete_file "_data/data-file-new.yml"

    expected_response = {
      "name"          => "data-file-new.yml",
      "path"          => "_data/data-file-new.yml",
      "relative_path" => "data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "raw_content" => "foo: bar\n" }
    put "/data/data-file-new.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-new.yml").to be_an_existing_file

    delete_file "_data/data-file-new.yml"
  end

  it "writes a new data file in subdirectory when given raw content" do
    delete_file "_data/test-dir/data-file-new.yml"

    expected_response = {
      "name"          => "data-file-new.yml",
      "path"          => "_data/test-dir/data-file-new.yml",
      "relative_path" => "test-dir/data-file-new.yml",
      "slug"          => "data-file-new",
      "ext"           => ".yml",
      "title"         => "Data File New",
      "raw_content"   => "foo: bar\n",
      "content"       => {
        "foo" => "bar",
      },
      "api_url"       => "http://localhost:4000/_api/data/test-dir/data-file-new.yml",
      "http_url"      => nil,
    }

    request = { "raw_content" => "foo: bar\n" }
    put "/data/test-dir/data-file-new.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/test-dir/data-file-new.yml").to be_an_existing_file

    delete_file "_data/test-dir/data-file-new.yml"
  end

  it "updates a data file" do
    write_file "_data/data-file-update.yml", "foo2: bar2"

    expected_response = {
      "name"          => "data-file-update.yml",
      "path"          => "_data/data-file-update.yml",
      "relative_path" => "data-file-update.yml",
      "slug"          => "data-file-update",
      "ext"           => ".yml",
      "title"         => "Data File Update",
      "raw_content"   => "foo: bar2\n",
      "content"       => {
        "foo" => "bar2",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-update.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar2" } }
    put "/data/data-file-update.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-update.yml").to be_an_existing_file

    delete_file "_data/data-file-update.yml"
  end

  it "updates a data file in a subdirectory" do
    write_file "_data/test-dir/data-file-update.yml", "foo2: bar2"

    expected_response = {
      "name"          => "data-file-update.yml",
      "path"          => "_data/test-dir/data-file-update.yml",
      "relative_path" => "test-dir/data-file-update.yml",
      "slug"          => "data-file-update",
      "ext"           => ".yml",
      "title"         => "Data File Update",
      "raw_content"   => "foo: bar2\n",
      "content"       => {
        "foo" => "bar2",
      },
      "api_url"       => "http://localhost:4000/_api/data/test-dir/data-file-update.yml",
      "http_url"      => nil,
    }

    request = { "content" => { "foo" => "bar2" } }
    put "/data/test-dir/data-file-update.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/test-dir/data-file-update.yml").to be_an_existing_file

    delete_file "_data/test-dir/data-file-update.yml"
  end

  it "renames a data file" do
    write_file "_data/data-file-rename.yml"
    delete_file "_data/data-file-renamed.yml"

    expected_response = {
      "name"          => "data-file-renamed.yml",
      "path"          => "_data/data-file-renamed.yml",
      "relative_path" => "data-file-renamed.yml",
      "slug"          => "data-file-renamed",
      "ext"           => ".yml",
      "title"         => "Data File Renamed",
      "raw_content"   => "foo: bar2\n",
      "content"       => {
        "foo" => "bar2",
      },
      "api_url"       => "http://localhost:4000/_api/data/data-file-renamed.yml",
      "http_url"      => nil,
    }

    request = {
      "path"    => "_data/data-file-renamed.yml",
      "content" => { "foo" => "bar2" },
    }
    put "/data/data-file-rename.yml", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)
    expect("_data/data-file-rename.yml").to_not be_an_existing_file
    expect("_data/data-file-renamed.yml").to be_an_existing_file

    get "/data/data-file-renamed.yml"
    expect(last_response).to be_ok
    expect(last_response_parsed).to eql(expected_response)

    delete_file "_data/data-file-rename.yml", "_data/data-file-renamed.yml"
  end

  it "deletes a data file" do
    write_file "_data/data-file-delete.yml", "foo2: bar2"
    delete "/data/data-file-delete.yml"
    expect(last_response).to be_ok
    expect("_data/data-file-delete.yml").to_not be_an_existing_file
  end

  it "deletes a data file in a subdirectory" do
    write_file "_data/test-dir/data-file-delete.yml", "foo2: bar2"
    delete "/data/test-dir/data-file-delete.yml"
    expect(last_response).to be_ok
    expect("_data/test-dir/data-file-delete.yml").to_not be_an_existing_file
  end
end
