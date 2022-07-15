module Jekyll

  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category-page.html')
      self.data['category'] = category
      self.data['title'] = category
    end
  end

  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category-page'
        dir = site.config['category_dir'] || 'category'
        site.categories.each_key do |category|
          category_dir = File.join(dir, Utils.slugify(category))
          site.pages << CategoryPage.new(site, site.source, category_dir, category)
        end
      end
    end
  end

end