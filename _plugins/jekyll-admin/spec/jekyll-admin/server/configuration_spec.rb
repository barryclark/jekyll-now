# frozen_string_literal: true

describe "configuration" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  it "returns the configuration" do
    get "/configuration"
    expect(last_response).to be_ok
    expect(last_response_parsed["content"]["foo"]).to eql("bar")
    expect(last_response_parsed.key?("source")).to eql(false)
  end

  it "updates the configuration" do
    config_path   = File.expand_path "_config.yml", fixture_path("site")
    config_body   = File.read(config_path)
    config_before = SafeYAML.load(config_body)
    config = config_before.dup

    config["foo"] = "bar2"
    begin
      put "/configuration", config.to_json

      expect(last_response).to be_ok
      expect(last_response_parsed["foo"]).to eql("bar2")
      expect(last_response_parsed.key?("source")).to eql(false)
    ensure
      File.write(config_path, config_body)
    end
  end

  it "doesn't inject the default collections" do
    config_path   = File.expand_path "_config.yml", fixture_path("site")
    config_body   = File.read(config_path)
    config_before = SafeYAML.load(config_body)

    config = config_before.dup
    config["collections"]["test"] = { "foo" => "bar" }

    begin
      put "/configuration", config.to_json
      collections = last_response_parsed["collections"]
      expect(collections["test"]["foo"]).to eql("bar")
      expect(collections.key?("posts")).to eql(false)
    ensure
      File.write(config_path, config_body)
    end
  end
end
