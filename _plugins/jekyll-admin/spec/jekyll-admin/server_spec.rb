# frozen_string_literal: true

describe JekyllAdmin::Server do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  it "returns the page index" do
    get "/pages"
    expect(last_response).to be_ok
    entries = last_response_parsed
    first_page = entries.reject do |entry|
      entry.key? "type"
    end.first
    expect(first_page["path"]).to eq("page.md")
  end

  it "returns an individual page" do
    get "/pages/page.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
  end

  # rubocop:disable Style/BracesAroundHashParameters
  it "responds to CORS preflight checks" do
    options "/", {}, { "HTTP_ORIGIN" => "http://localhost:3000" }
    expect(last_response.status).to eql(204)

    expected = {
      "Access-Control-Allow-Origin"  => "http://localhost:3000",
      "Access-Control-Allow-Methods" => "DELETE, GET, OPTIONS, POST, PUT",
    }

    expected.each do |key, value|
      expect(last_response.headers[key]).to eql(value)
    end
  end
  # rubocop:enable Style/BracesAroundHashParameters
end
