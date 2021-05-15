# frozen_string_literal: true

describe JekyllAdmin::StaticServer do
  include Rack::Test::Methods

  def app
    JekyllAdmin::StaticServer
  end

  def expected_index
    expected = File.read(index_path)
    expected.gsub!("\n", "\r\n") if Gem.win_platform?
    expected
  end

  it "returns the index" do
    with_index_stubbed do
      get "/"
      expect(last_response).to be_ok
      expect(last_response.body).to eql(expected_index)
    end
  end

  it "returns the index for non-existent paths" do
    with_index_stubbed do
      get "/collections"
      expect(last_response).to be_ok
      expect(last_response.body).to eql(expected_index)
    end
  end
end
