# frozen_string_literal: true

describe JekyllAdmin::APIable do
  [:page, :post].each do |type|
    context type do
      subject do
        documents = Jekyll.sites.first.send("#{type}s".to_sym)
        if type == :page
          documents.find(&:html?)
        else
          documents.docs.first
        end
      end

      [false, true].each do |with_content|
        context "#{with_content ? "with" : "without"} content" do
          let(:as_api) { subject.to_api(:include_content => with_content) }
          let(:content)  { as_api["content"] }
          let(:raw_content)  { as_api["raw_content"] }
          let(:front_matter) { as_api["front_matter"] }

          it "is responds to to_api" do
            expect(subject).to respond_to(:to_api)
          end

          if with_content
            it "includes the raw_content" do
              expect(raw_content).to eql("# Test #{type.to_s.capitalize}\n")
            end

            it "includes the rendered content" do
              expected = "<h1 id=\"test-#{type}\">Test #{type.capitalize}</h1>\n"
              expect(content).to eql(expected)
            end

            it "includes the raw front matter" do
              expect(front_matter).to have_key("foo")
              expect(front_matter["foo"]).to eql("bar")
            end

            it "doesn't include front matter defaults in the raw front matter" do
              expect(front_matter).to_not have_key("some_front_matter")
            end
          else

            it "doesn't include the raw content" do
              expect(as_api).to_not have_key("raw_content")
            end

            it "doesn't include the rendered content" do
              expect(as_api).to_not have_key("content")
              expect(as_api).to_not have_key("output")
            end
          end

          it "includes front matter defaults as top-level keys" do
            expect(as_api).to have_key("all")
            expect(as_api["all"]).to eql(true)
          end

          it "includes front matter as top-level keys" do
            expect(as_api["foo"]).to eql("bar")
          end
        end
      end
    end
  end
end
