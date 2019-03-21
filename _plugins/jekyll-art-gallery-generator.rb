# Jekyll art gallery generator plugin
# Distribiuted under MIT license with attribution
#
require 'rmagick'
require 'exifr/jpeg'
include Magick

include FileUtils

$image_extensions = [".png", ".jpg", ".jpeg", ".gif"]

module Jekyll
  class GalleryFile < StaticFile
    def write(dest)
      return false
    end
  end

  class ReadYamlPage < Page
    def read_yaml(base, name, opts = {})
      begin
        self.content = File.read(File.join(base.to_s, name.to_s), (site ? site.file_read_opts : {}).merge(opts))
        if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
          self.content = $POSTMATCH
          self.data = SafeYAML.load($1)
        end
      rescue SyntaxError => e
        Jekyll.logger.warn "YAML Exception reading #{File.join(base, name)}: #{e.message}"
      rescue Exception => e
        Jekyll.logger.warn "Error reading file #{File.join(base, name)}: #{e.message}"
      end

      self.data ||= {}
    end
  end

  # main page linking all galleries together
  class GalleryIndex < ReadYamlPage
    def initialize(site, base, dir, galleries)
      @site = site
      @base = base
      @dir = dir.gsub(/^_/, "")
      @name = "index.html"
      # load gallery configs from the _data/gallery.yml file
      config = site.data["gallery"] || {}

      self.process(@name)
      gallery_index = File.join(base, "_layouts", "art_gallery_index.html")
      unless File.exists?(gallery_index)
        gallery_index = File.join(File.dirname(__FILE__), "art_gallery_index.html")
      end
      self.read_yaml(File.dirname(gallery_index), File.basename(gallery_index))
      self.data["title"] = config["title"] || "Photos"
      self.data["galleries"] = []

      begin
        sort_field = config["sort_field"] || "name"
        galleries.sort! {|a,b| a.data[sort_field] <=> b.data[sort_field]}
      rescue Exception => e
        puts "Error sorting galleries: #{e}"
        puts e.backtrace
      end
      if config["sort_reverse"]
        galleries.reverse!
      end

      site.data["galleries-sorted"]=[]
      galleries.each {|gallery|
        unless gallery.hidden
          self.data["galleries"].push(gallery.data)
          # site-wide data for use in liquid templates
          # available to liquid via site.data.gallery.galleries.[name]. subitems are manually defined in gallery.yml, and title, link, description, best_image etc and images array
          # inject additional auto-discovered data back into sitewide gallery object
          gallery_title=gallery.data["title"]
          if site.data["gallery"]["galleries"].has_key?(gallery_title)
            site.data["gallery"]["galleries"][gallery_title].merge!(gallery.data)
          else
            site.data["gallery"]["galleries"][gallery_title]=gallery.data
          end
          site.data["galleries-sorted"].push(gallery.data["title"]) # sorted array to order the galleries hash on the portfolio page
        end
      }
    end
  end

  # gallery page for each gallery
  class GalleryPage < ReadYamlPage
    attr_reader :hidden

    def initialize(site, base, dir, gallery_name)
      @site = site
      @base = base
      #source_dir=dir

      @dir = dir.gsub(/^_/, "").gsub(/[^0-9A-Za-z.\\\-\/]/, '_').downcase   # destination dir, same as source without the leading underscore. web compatible
      FileUtils.mkdir_p(site.in_dest_dir(@dir), :mode => 0755)

      @name = "index.html"
      @images = []
      @hidden = false

      # load configs, set defaults
      config = site.data["gallery"] || {}
      symlink = config["symlink"] || false
      # downcase gallery names, technically duplicating them
      galleries = {}
      (config["galleries"] || {}).each_pair do |k,v|
          galleries.merge!({k.downcase => v})
        end
      gallery_config = galleries[gallery_name.downcase] || {}
      #puts "Generating #{gallery_name}: #{gallery_config}"
      sort_field = config["sort_field"] || "name"

      self.process(@name)
      gallery_page = File.join(base, "_layouts", "art_gallery_page.html")
      unless File.exists?(gallery_page)
        gallery_page = File.join(File.dirname(__FILE__), "art_gallery_page.html")
      end
      self.read_yaml(File.dirname(gallery_page), File.basename(gallery_page))
      self.data["gallery"] = gallery_name # aka folder name
      self.data["description"] = gallery_config["description"]

      # prettify gallery name if not set
      gallery_name = gallery_name.gsub("_", " ").gsub(/\w+/) {|word| word.capitalize}
      gallery_name = gallery_config["title"] || gallery_name
      self.data["title"] = gallery_name
      self.data["link"] = "/#{@dir}/"
      # thumbnail destination
      scale_method = gallery_config["scale_method"] || config["scale_method"] || "fit" # each gallery can have it's own scale method, or use the global scale if defined
      @hidden = gallery_config["hidden"] || false # the gallery can also be hidden by renaming it to start with a dot
      if @hidden
        self.data["sitemap"] = false
        return
      end
      if config["watermark"]      # load watermark image
        wm_img = Image.read(File.join(base, "images",config["watermark"])).first
      end

        # process and copy images
      self.data["captions"] = {}
      self.data["exif"] = {}

      date_times = {}
      Dir.foreach(dir) do |image|
        next if image.chars.first == "."
        next unless image.downcase().end_with?(*$image_extensions)

        image_path = File.join(dir, image) # source image short path

        # extract timestamp
        if sort_field == "timestamp"
          begin
            #date_times[image] = EXIFR::JPEG.new(image_path).date_time.to_i
            date_times[image]=0
            #  ["DateTime"], ["DateTimeDigitized"], ["DateTimeOriginal"]
            date_array = ImageList.new(image_path).get_exif_by_entry("DateTime")
            if date_array != nil && date_array.length > 0 and date_array[0].length > 1
              date_times[image]=DateTime.strptime(date_array[0][1],"%Y:%m:%d %H:%M:%S").to_time.to_i
            end
            # puts "gtot #{date_array} date" + date_times[image].to_s
          rescue Exception => e
            puts "Error getting date_time "+date_times[image]+" for #{image}: #{e}"
          end
        end
          # cleanup, watermark and copy the files
          # Strip out the non-ascii character and downcase the final file name
          dest_image=image.gsub(/[^0-9A-Za-z.\-]/, '_').downcase
          dest_image_abs_path = site.in_dest_dir(File.join(@dir, dest_image))
        if File.file?(dest_image_abs_path) == false or File.mtime(image_path) > File.mtime(dest_image_abs_path)
          if config["strip_exif"] or config["watermark"] or config["size_limit"] # can't simply copy or symlink, need to pre-process the image
            source_img=ImageList.new(image_path)
            print "Generating #{dest_image}..."
            if config["strip_exif"]
              print "stripping EXIF..."
              source_img.strip!
            end
            if config["watermark"]
              if [source_img.columns,source_img.rows].min < 600
                print "too small to watermark"
              else
                print "watermarking"
                # watermark parameters are: image, how much of watermark lightness to compose in "xx%", how much of watermark's saturation to compose (%), gravity (SouthEastGravity is good), x-offset (origin depends on gravity), y-offset
                source_img.composite!(wm_img,Magick::SouthEastGravity,20,20,Magick::HardLightCompositeOp).write(dest_image_abs_path)
              end
            end
            if config["size_limit"]
              source_img.resize_to_fit!(config["size_limit"], config["size_limit"]) if (source_img.columns > config["size_limit"] || source_img.rows > config["size_limit"]) # resize only if bigger than the limit
            end
            source_img.write(dest_image_abs_path)
            print "\n"
          elsif symlink
            print "Symlinking #{image_path} to #{dest_image}..."
            link_src = site.in_source_dir(image_path)
            link_dest = dest_image_abs_path
            @site.static_files.delete_if { |sf|
              sf.relative_path == "/" + image_path
            }
            @site.static_files << GalleryFile.new(site, base, dir, image)
            if File.exists?(link_dest) or File.symlink?(link_dest)
              if not File.symlink?(link_dest)
                puts "#{link_dest} exists but is not a symlink. Deleting."
                File.delete(link_dest)
              elsif File.readlink(link_dest) != link_src
                puts "#{link_dest} points to the wrong file. Deleting."
                File.delete(link_dest)
              end
            end
            if not File.exists?(link_dest) and not File.symlink?(link_dest)
              File.symlink(link_src, link_dest)
            end
            print "\n"
          else
            puts "Copying #{image_path} to #{dest_image}..."
            FileUtils.cp(image_path,dest_image_abs_path)
          end
        end
        # Add file descriptions if defined
        if gallery_config.has_key?(image)
          # puts "added ${image} = #{gallery_config[image]}"
          self.data["captions"][dest_image]=gallery_config[image]
        else
          # If not defined add a trimmed filename to help with SEO
          self.data["exif"][dest_image] = {}
          self.data["exif"][dest_image]["model"]=EXIFR::JPEG.new(dest_image_abs_path).model
          self.data["exif"][dest_image]["focal_length"]=EXIFR::JPEG.new(dest_image_abs_path).focal_length.to_i
          self.data["exif"][dest_image]["shutter"]=EXIFR::JPEG.new(dest_image_abs_path).exposure_time.to_s
          self.data["exif"][dest_image]["iso"]=EXIFR::JPEG.new(dest_image_abs_path).iso_speed_ratings
          self.data["exif"][dest_image]["fstop"]=EXIFR::JPEG.new(dest_image_abs_path).f_number.to_f
          self.data["exif"][dest_image]["lens"]=EXIFR::JPEG.new(dest_image_abs_path).lens_model

          self.data["captions"][dest_image]=File.basename(image,File.extname(image)).gsub("_", " ")
        end
        # remember the image
        @images.push(dest_image)
        @site.static_files << GalleryFile.new(site, base, @dir, dest_image)

        # make a thumbnail
        makeThumb(image_path, dest_image, config["thumbnail_size"]["x"] || 400, config["thumbnail_size"]["y"] || 400, scale_method)
      end

      # sort pictures inside the gallery
      begin
        if sort_field == "timestamp"
          @images.sort! {|a,b|
            if date_times[a] == date_times[b]
              a <=> b # do the name if the timestamps match
            else
              date_times[a] <=> date_times[b]
            end
          }
        else
          @images.sort!
        end
        if gallery_config["sort_reverse"]
          @images.reverse!
        end
      rescue Exception => e
        puts "Error sorting images in gallery #{gallery_name}: #{e}"
        # puts e.backtrace
      end

      site.static_files = @site.static_files
      self.data["images"] = @images

      best_image = gallery_config["best_image"] || @images[0]
      best_image.gsub!(/[^0-9A-Za-z.\-]/, '_') # renormalize the name - important in case the best image name is specified via config
      best_image.downcase! # two step because mutating gsub returns nil that's unusable in a compound call
      #best_image = File.join(@dir, best_image)
      self.data["best_image"] = best_image

      # generate best image thumb for the gallery super-index page
      makeThumb(site.in_dest_dir(File.join(@dir, best_image)), "front_"+best_image, config["front_thumb_size"]["x"] || 400, config["front_thumb_size"]["y"] || 400,"crop")

      # generate best image thumb for the header of a gallery index page
      makeThumb(site.in_dest_dir(File.join(@dir, best_image)), "header_"+best_image, config["header_thumb_size"]["x"] || 400, config["header_thumb_size"]["y"] || 400,"crop")

      self.data["header"]["image_fullwidth"] = "thumbs/header_"+best_image # used in the theme
      GC.start
    end

    def makeThumb(image_path, dest_image, thumb_x, thumb_y, scale_method)
      # create thumbnail if it is not there
      thumbs_dir = File.join(site.dest, @dir, "thumbs")
      #thumbs_dir = File.join(@dir, "thumbs")
      thumb_path = File.join(thumbs_dir, dest_image)

      # create thumbnails
      FileUtils.mkdir_p(thumbs_dir, :mode => 0755)
      if File.file?(thumb_path) == false or File.mtime(image_path) > File.mtime(thumb_path)
        begin
          m_image = ImageList.new(image_path)
          # m_image.auto_orient!
          #m_image.send("resize_to_#{scale_method}!", max_size_x, max_size_y)
          if scale_method == "crop"
            m_image.resize_to_fill!(thumb_x, thumb_y)
          elsif scale_method == "crop_bottom"
              m_image.resize_to_fill!(thumb_x, thumb_y, NorthGravity)
          elsif scale_method == "crop_right"
              m_image.resize_to_fill!(thumb_x, thumb_y, WestGravity)
          elsif scale_method == "crop_left"
              m_image.resize_to_fill!(thumb_x, thumb_y, EastGravity)
          elsif scale_method == "crop_top"
              m_image.resize_to_fill!(thumb_x, thumb_y, SouthGravity)
          else
              m_image.resize_to_fit!(thumb_x, thumb_y)
            end
          # strip EXIF from thumbnails. Some browsers, notably, Safari on iOS will try to rotate images according to the 'orientation' tag which is no longer valid in case of thumbnails
          m_image.strip!
          puts "Writing thumbnail to #{thumb_path}"
          m_image.write(thumb_path)
        rescue Exception => e
          puts "Error generating thumbnail for #{image_path}: #{e}"
          # puts e.backtrace
        end
      end
      # record the thumbnail
      @site.static_files << GalleryFile.new(@site, @base, thumbs_dir, dest_image)
    end
  end

  class GalleryGenerator < Generator
    safe true

    def generate(site)
      config = site.data["gallery"] || {}
      dir = config["source_dir"] || "_photos"
      galleries = []
      original_dir = Dir.getwd

      # generate galleries
      Dir.chdir(site.source)
      begin
        Dir.foreach(dir) do |gallery_dir|
          gallery_path = File.join(dir, gallery_dir)
          if File.directory?(gallery_path) and gallery_dir.chars.first != "." # skip galleries starting with a dot
            gallery = GalleryPage.new(site, site.source, gallery_path, gallery_dir)
            gallery.render(site.layouts, site.site_payload)
            gallery.write(site.dest)
            site.pages << gallery
            galleries << gallery
          end
        end
      rescue Exception => e
        puts "Error generating galleries: #{e}"
        puts e.backtrace
      end
      Dir.chdir(original_dir)

      # generate gallery index
      gallery_index = GalleryIndex.new(site, site.source, dir, galleries)
      gallery_index.render(site.layouts, site.site_payload)
      gallery_index.write(site.dest)

      site.pages << gallery_index
    end
  end
end
