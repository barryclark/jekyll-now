# frozen_string_literal: true

class PathHelperTest
  include JekyllAdmin::PathHelper

  attr_accessor :params, :request_payload, :namespace

  def initialize(params = {}, request_payload = {}, namespace = nil)
    @params = params
    @request_payload = request_payload
    @namespace = namespace
  end

  def collection
    JekyllAdmin.site.collections["puppies"] if namespace == "collections"
  end
end

RSpec.describe JekyllAdmin::PathHelper do
  let(:path) { "page" }
  let(:ext) { "md" }
  let(:splat) { ["/"] }
  let(:params) { { "path" => path, "ext" => ext, "splat" => splat } }
  let(:request_payload) { {} }
  let(:site_source) { fixture_path("site") }
  let(:namespace) { "pages" }
  let(:subject) do
    PathHelperTest.new(params, request_payload, namespace)
  end

  context "sanitization" do
    let(:relative_path) { "/foo/bar" }
    let(:path) { "#{site_source}/foo/bar" }
    it "sanitizes a normal path" do
      expect(subject.sanitized_path("foo/bar")).to eql(path)
      expect(subject.sanitized_relative_path("foo/bar")).to eql(relative_path)
    end

    it "sanitizes a relative path" do
      expect(subject.sanitized_path("../foo/bar")).to eql(path)
      expect(subject.sanitized_relative_path("../foo/bar")).to eql(relative_path)
    end

    it "sanitizes an absolute path" do
      expect(subject.sanitized_path(path)).to eql(path)
      expect(subject.sanitized_relative_path(path)).to eql(relative_path)
    end
  end

  it "returns the filename" do
    expect(subject.filename).to eql("page.md")
  end

  it "returns the relative path" do
    expect(subject.relative_path).to eql("/page.md")
  end

  context "write path" do
    context "when the file isn't renamed" do
      it "returns the write path" do
        expect(subject.write_path).to eql("#{site_source}/page.md")
        expect(subject.relative_write_path).to eql("/page.md")
      end

      it "knows it's not renamed" do
        expect(subject).to_not be_renamed
      end
    end

    context "when the file is renamed" do
      let(:request_payload) { { "path" => "renamed.md" } }

      it "returns the write path" do
        expect(subject.write_path).to eql("#{site_source}/renamed.md")
        expect(subject.relative_write_path).to eql("/renamed.md")
      end

      it "knows it's renamed" do
        expect(subject).to be_renamed
      end
    end
  end

  it "knows the directory path" do
    expect(subject.send(:directory_path)).to eql("#{site_source}/")
  end

  context "subdir" do
    let(:splat) { ["foo"] }

    it "knows the directory path" do
      expect(subject.send(:directory_path)).to eql("#{site_source}/foo")
    end

    it "returns the path" do
      expect(subject.path).to eql("#{site_source}/foo/page.md")
    end

    it "returns the relative path" do
      expect(subject.relative_path).to eql("/foo/page.md")
    end

    it "returns the write path" do
      expect(subject.write_path).to eql("#{site_source}/foo/page.md")
    end
  end

  context "collections" do
    let(:namespace) { "collections" }

    it "knows the directory path" do
      expect(subject.send(:directory_path)).to eql("#{site_source}/_puppies")
    end

    it "returns the path" do
      expect(subject.path).to eql("#{site_source}/_puppies/page.md")
    end

    it "returns the relative path" do
      expect(subject.relative_path).to eql("/_puppies/page.md")
    end

    it "returns the write path" do
      expect(subject.write_path).to eql("#{site_source}/_puppies/page.md")
    end
  end
end
