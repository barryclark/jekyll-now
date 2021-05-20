# frozen_string_literal: true

describe JekyllAdmin do
  include Rack::Test::Methods

  it "returns the site" do
    expect(described_class.site.class).to eql(Jekyll::Site)
    expect(described_class.site.source).to eql(fixture_path("site"))
  end
end
