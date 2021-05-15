# frozen_string_literal: true

class FileHelperTest
  include JekyllAdmin::FileHelper
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

  def site
    JekyllAdmin.site
  end
end

RSpec.describe JekyllAdmin::FileHelper do
  let(:path) { "page" }
  let(:ext) { "md" }
  let(:splat) { ["/"] }
  let(:params) { { "path" => path, "ext" => ext, "splat" => splat } }
  let(:request_payload) { {} }
  let(:site_source) { fixture_path("site") }
  let(:namespace) { "pages" }
  let(:subject) do
    FileHelperTest.new(params, request_payload, namespace)
  end

  context "finding files" do
    it "finds the requested file" do
      expect(subject.requested_file).to_not be_nil
      expect(subject.requested_file.name).to eql("page.md")
    end

    it "finds the written file" do
      expect(subject.written_file).to_not be_nil
      expect(subject.written_file.name).to eql("page.md")
    end

    context "renaming" do
      let(:request_payload) { { "path" => "page-dir/page1.md" } }

      it "finds the requested file" do
        expect(subject.requested_file).to_not be_nil
        expect(subject.requested_file.path).to eql("page.md")
      end

      it "finds the written file" do
        expect(subject.written_file).to_not be_nil
        expect(subject.written_file.path).to eql("page-dir/page1.md")
      end
    end
  end

  context "writing and deleting" do
    let(:path) { "#{site_source}/write-and-delete.md" }
    let(:content) { "TEST TEST TEST" }
    before { FileUtils.rm_rf(path) }
    after { FileUtils.rm_rf(path) }

    context "writing" do
      before { FileUtils.rm_rf(path) }

      it "writes the file" do
        subject.write_file(path, content)
        expect(path).to be_an_existing_file
        actual_content = File.read(path)
        expect(actual_content).to eql(content)
      end
    end

    context "deleting" do
      before { FileUtils.touch(path) }

      it "deletes the file" do
        subject.delete_file(path)
        expect(path).to_not be_an_existing_file
      end
    end
  end
end
