module Jekyll
  class ArchiveGenerator < Generator
    safe true

    def generate(site)
      collate_by_month(site.posts).each do |month, posts|
        page = ArchivePage.new(site, month, posts)
        site.pages << page
      end
    end

    private

    def collate_by_month(posts)
      collated = {}
      posts.each do |post|
        key = "#{post.date.year}/#{post.date.month}"
        if collated.has_key? key
          collated[key] << post
        else
          collated[key] = [post]
        end
      end
      collated
    end
  end
end
