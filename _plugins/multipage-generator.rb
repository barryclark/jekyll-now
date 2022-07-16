module Jekyll

	class MultiPage < Page

		# Provide setters for these, so we can switch them out after instantiation.
		attr_accessor :dir, :name

	end

	class MultiPageGenerator < Generator
		safe true
		priority :low

		def initialize(config = {})
			super

			# Configuration options. Can be set globally in site YAML, and/or overridden per post.
			@config_collation_enabled = "multipage_collation_enabled" # boolean true
			@config_collate_on_root_page = "multipage_collate_on_root_page" # boolean false
			@config_collated_page_slug = "multipage_collated_page_slug" # string "all"
			@config_first_page_number = "multipage_first_page_number" # number 1
			@config_page_slug_format = "multipage_page_slug_format" # string ":num"
			@config_auto_wrap_paging = "multipage_auto_wrap_paging" # boolean true
			@config_paging_on_collated_page = "multipage_paging_on_collated_page" # boolean true
			@config_auto_wrap_type = "multipage_auto_wrap_type" # string "both" or "header" or "footer"
			@config_paging_template = "multipage_paging_template" # string "multipage-paging.html"
			@config_pagebreak_template = "multipage_pagebreak_template" # string "multipage-pagebreak.html"
			@config_page_title_expanded_format = "multipage_page_title_expanded_format" # string ":post_title - :page_title" (can also use :num)
			@config_page_title_format = "multipage_page_title_format" # string "Page :num" (can also use :post_title)
			@config_root_first_page_uses_post_title = "multipage_root_first_page_uses_post_title" # boolean true
			@config_collated_page_title_format = "multipage_collated_page_title_format" # string ":post_title"
			@config_auto_pagebreak_at_headings = "multipage_auto_pagebreak_at_headings" # boolean false
			@config_auto_pagebreak_heading_level = "multipage_auto_pagebreak_heading_level" # number 2
			@config_use_headings_for_page_titles = "multipage_use_headings_for_page_titles" # boolean true
			@config_rewrite_anchor_links = "multipage_rewrite_anchor_links" # boolean true


			# YAML setting (boolean) that indicates a post should be multipaged.
			@multipage_frontmatter_key = "multipage" # set to true to enable multipaging


			# Regexps to match the special tags within multipage posts, e.g. {% pagebreak %}
			@pagebreak_regexp = /\{%\s*page_break\s*%\}/i # page_break
			@paging_regexp = /\{%\s*paging\s*%\}/i # paging
			@expanded_title_regexp = /\{%\s*expanded_page_title\s*['"]([^'"]+)["']\s*%\}/i # expanded_page_title "foo"
			@title_regexp = /\{%\s*page_title\s*['"]([^'"]+)["']\s*%\}/i # page_title "foo"
			@page_link_regexp = /\{%\s*page_link\s*['"]?(n?\d+)["']?\s*%\}/i # page_link 3 (page at index 3) OR page_link n3 (page number 3)
			# Regexp for finding headings: HTML, Setext, and Atx styles.
			@heading_regexp = /(<h\d(?:[^>]*)>(?:<[^>]+>){0,}([^<>]+)(?:<[^>]+>){0,}<\/h\d>)|(^\#{1,}\s*(.+?)(?>\s*\#+)?(?>\s*\{[^\}]+\})?$)|(^[\t ]*?(\w[^\r\n]+?)[\t ]*?(?:\{[^\}]+\})?$(?:\s?)^[-=]+)/i
			# Regexps to extract ID attributes from HTML or Markdown.
			@named_anchor_regexp_html = /<a [^>]*name=["']([^"']+)["'][^>]*>/i
			@id_regexp_html = /<[^>]+id=["']([^"']+)["'][^>]*>/i
			@id_regexp_markdown = /\{[^\}]*\#([^\s]+)[^\}]*\}/i
			# Regexps to identify links.
			@link_regexp_html = /<a [^>]*href=["']([^"']+)["'][^>]*>/i
			@link_regexp_markdown = /\[[^\]]+\]\(((?:[^\#]*)\#[^\)]+)\)/i
		end

		def generate(site)
			process_multipages(site)
		end

		def create_multipage(post, site)
			# Cache post's info in case we have to modify the original (if it's page 1, instead of the collated page).
			post_original_title = post.respond_to?("title") ? post.title : post.data["title"]
			post_original_data = {}.merge(post.data)
			post_original_content = post.content
			post_original_name = post.name
			post_original_url = post.url
			last_filename_posn = post_original_url.rindex("index.html")
			if (last_filename_posn)
				post_original_url = post_original_url.slice(0, last_filename_posn)
			end
			post_original_path = post.path

			# Define tokens available for titles etc.
			number_token = ":num"
			post_title_token = ":post_title"
			page_title_token = ":page_title"

			# Obtain settings
			collation_enabled = get_setting(@config_collation_enabled, site, post_original_data, true)
			collate_at_root = get_setting(@config_collate_on_root_page, site, post_original_data, false)
			collated_page_slug = get_setting(@config_collated_page_slug, site, post_original_data, "all")
			starting_index = get_setting(@config_first_page_number, site, post_original_data, 1)
			slug_format = get_setting(@config_page_slug_format, site, post_original_data, "#{number_token}")
			auto_wrap_paging = get_setting(@config_auto_wrap_paging, site, post_original_data, true)
			paging_on_collated_page = get_setting(@config_paging_on_collated_page, site, post_original_data, true)
			paging_type = get_setting(@config_auto_wrap_type, site, post_original_data, "both").downcase
			paging_template = get_setting(@config_paging_template, site, post_original_data, "multipage-paging.html")
			pagebreak_template = get_setting(@config_pagebreak_template, site, post_original_data, "multipage-pagebreak.html")
			expanded_title_format = get_setting(@config_page_title_expanded_format, site, post_original_data, "#{post_title_token} - #{page_title_token}")
			title_format = get_setting(@config_page_title_format, site, post_original_data, "Page #{number_token}")
			root_first_page_uses_post_title = get_setting(@config_root_first_page_uses_post_title, site, post_original_data, true)
			collated_page_title_format = get_setting(@config_collated_page_title_format, site, post_original_data, ":post_title")
			auto_pagebreak_at_headings = get_setting(@config_auto_pagebreak_at_headings, site, post_original_data, false)
			pagebreak_heading_level = get_setting(@config_auto_pagebreak_heading_level, site, post_original_data, 2)
			use_headings_for_page_titles = get_setting(@config_use_headings_for_page_titles, site, post_original_data, true)
			rewrite_anchor_links = get_setting(@config_rewrite_anchor_links, site, post_original_data, true)

			# Work out how many pages this post will need.
			pages = post_original_content.split(@pagebreak_regexp)

			# Note the total number of (non-collated) pages.
			num_pages = pages.count

			# Work out whether we need to further split pages at their headings.
			headings = {}
			page_title_overrides = {}
			if auto_pagebreak_at_headings
				# Look for headings.
				new_pages = []
				pages.each_with_index { |page_content, page_num|
					# Determine if this page has headings we want to split on.
					headings = find_all_headings(page_content)
					if headings.length > 0
						start_of_last_match = 0
						headings.each_with_index { |heading_info, heading_num|
							if heading_info["heading_level"].to_i == pagebreak_heading_level.to_i
								# We should auto-pagebreak just before this heading.
								# Copy content from end_of_last_match to end of this match into a new page.
								start_of_this_match = heading_info["match_offset_in_content"]
								new_page_length = start_of_this_match - start_of_last_match
								new_pages.push page_content.slice(start_of_last_match, new_page_length)

								# Note title override, if appropriate.
								if use_headings_for_page_titles
									page_title_overrides[new_pages.length] = heading_info["heading_text"]
								end

								# Update last offset.
								start_of_last_match = start_of_this_match
							end
						}
						# Ensure any trailing content after the last heading-match becomes a page too.
						if start_of_last_match < page_content.length
							new_page_length = page_content.length - start_of_last_match
							new_pages.push page_content.slice(start_of_last_match, new_page_length)
						end
					else
						new_pages.push page_content
					end
				}
				
				# Note the new set of pages.
				pages = new_pages

				# Update our page-count.
				num_pages = pages.count
			end

			# Abort if this post doesn't need multiple pages.
			if num_pages < 2
				# If there's only one page, we have nothing to do.
				return
			end

			# Handle the collated page.
			if !collation_enabled
				# Can't use the root page as a collated page if we're not collating.
				collate_at_root = false
			end
			collated_page = nil
			collated_path = ""
			if collation_enabled
				# Add the full original content for the collated page to the end of the pages array.
				pages.push post_original_content

				if collate_at_root
					# Root page is the collated page.
					collated_path = post_original_url
					collated_page = post
				else
					# Root page is page 1 of content. The collated page is elsewhere.
					collated_path = File.join(post_original_url, collated_page_slug)
				end
			end

			# Create template multipage data for each page to use.
			page_numbers = []
			page_paths = []
			page_titles = []
			expanded_page_titles = []
			out_of_bounds_index_value = -1

			# Create arrays of page numbers, paths, and titles.
			pages.each_with_index { |page_content, page_num|
				# Handle page numbers and paths.
				is_root_first_page = !collate_at_root && page_num == 0
				is_collated_page = collation_enabled && page_num == pages.length - 1
				is_non_root_collated_page = is_collated_page && !collate_at_root

				if !is_collated_page
					page_slug_number = starting_index + page_num
				else
					page_slug_number = out_of_bounds_index_value
				end
				page_numbers.push page_slug_number

				if !is_root_first_page
					if !is_collated_page
						# This is a regular page with a number.
						page_slug = slug_format.gsub(number_token, page_slug_number.to_s)
						page_path = File.join(post_original_url, page_slug)
					else
						# This is the collated page.
						page_path = collated_path
					end
				else
					# This is the root page as the first page of content.
					page_path = post_original_url
				end
				page_paths.push page_path

				# Handle titles.
				# Check to see if this page overrides the page title format.
				this_page_title_format = is_collated_page ? post_original_title : title_format
				# Handle overrides from headings.
				if page_title_overrides.key?(page_num)
					this_page_title_format = page_title_overrides[page_num]
				end
				title_match = @title_regexp.match(page_content)
				if title_match
					this_page_title_format = title_match[1]
				end
				# Perform appropriate substitutions in the title format string.
				this_page_title = this_page_title_format
				this_page_title = this_page_title.gsub("#{post_title_token}", post_original_title)
				this_page_title = this_page_title.gsub("#{number_token}", page_slug_number.to_s)
				page_titles.push this_page_title

				# Check to see if this page overrides the expanded page title format.
				this_page_expanded_title_format = is_collated_page ? post_original_title : expanded_title_format

				# Handle the collated page title setting.
				if is_collated_page
					this_page_expanded_title_format = collated_page_title_format
				end

				# Handle special exception for root pages that are the first page, if appropriate.
				if is_root_first_page && root_first_page_uses_post_title
					this_page_expanded_title_format = post_original_title
				end

				title_match = @expanded_title_regexp.match(page_content)
				if title_match
					this_page_expanded_title_format = title_match[1]
				end
				# Perform appropriate substitutions in the expanded title format string.
				this_expanded_page_title = this_page_expanded_title_format
				this_expanded_page_title = this_expanded_page_title.gsub("#{post_title_token}", post_original_title)
				this_expanded_page_title = this_expanded_page_title.gsub("#{number_token}", page_slug_number.to_s)
				this_expanded_page_title = this_expanded_page_title.gsub("#{page_title_token}", this_page_title)
				expanded_page_titles.push this_expanded_page_title
			}

			# Rewrite anchor links, if appropriate.
			pages_before_link_rewriting = pages.map do |e| e.dup end # duplicate pages
			anchor_page_mappings = {}
			if rewrite_anchor_links
				# Find all anchors.
				pages.each_with_index { |page_content, page_num|
					# Skip the collated page.
					if collation_enabled && page_num == num_pages
						next
					end

					# Conduct survey of all headings.
					headings = find_all_headings(page_content)
					headings.each { |heading|
						heading_id = heading["heading_id"]
						if !anchor_page_mappings.key?(heading_id)
							anchor_page_mappings[heading_id] = page_num
							#puts "Added heading mapping '#{heading_id}' > page #{page_num}"
						end
					}

					# Conduct survey of all named (<A NAME="">) anchors.
					anchor_matches = page_content.to_enum(:scan, @named_anchor_regexp_html).map { Regexp.last_match }
					anchor_matches.each { |match|
						anchor_name = match[1]
						if !anchor_page_mappings.key?(anchor_name)
							anchor_page_mappings[anchor_name] = page_num
							#puts "Added anchor mapping '#{anchor_name}' > page #{page_num}"
						end
					}

					# Conduct survey of all ID attributes in HTML tags.
					id_attr_matches = page_content.to_enum(:scan, @id_regexp_html).map { Regexp.last_match }
					id_attr_matches.each { |match|
						id_attr = match[1]
						if !anchor_page_mappings.key?(id_attr)
							anchor_page_mappings[id_attr] = page_num
							#puts "Added id attr mapping '#{id_attr}' > page #{page_num}"
						end
					}
				}

				# Find all links.
				pages.each_with_index { |page_content, page_num|
					# Skip the collated page.
					if collation_enabled && page_num == num_pages
						next
					end
					
					# Identify all HTML links, excluding those with page_title tags.
					html_link_matches = page_content.to_enum(:scan, @link_regexp_html).map { Regexp.last_match }
					html_link_matches.each { |match|
						#puts "Found HTML link: #{match[0]}"
						# Discard links with page_title tags.
						if !(@page_link_regexp =~ match[0])
							# Look up the correct page for this anchor.
							anchor = match[1].slice(1, match[1].length - 1)
							if anchor_page_mappings.key?(anchor)
								# Construct the new link.
								anchor_page = anchor_page_mappings[anchor]
								linked_page_path = page_paths[anchor_page.to_i]
								if linked_page_path
									if !linked_page_path.slice(-1, 1).eql?("/")
										linked_page_path = "#{linked_page_path}/"
									end
									new_link_url = "#{linked_page_path}\##{anchor}"

									# Rewrite the link.
									anchor_offset = match.offset(1)[0] - match.pre_match.length
									link_start = match[0].slice(0, anchor_offset)
									anchor_end_offset = link_start.length + match[1].length
									link_end = match[0].slice(anchor_end_offset, match[0].length - anchor_end_offset)
									new_link = "#{link_start}#{new_link_url}#{link_end}"
									#puts "Will replace #{match[0]} with #{new_link}"
									page_content.gsub!(match[0], new_link)
								end
							end
						end
					}

					# Identify all Markdown links, excluding those with page_title tags.
					markdown_link_matches = page_content.to_enum(:scan, @link_regexp_markdown).map { Regexp.last_match }
					markdown_link_matches.each { |match|
						#puts "Found Markdown link: #{match[0]}"
						# Discard links with page_title tags.
						if !(@page_link_regexp =~ match[0])
							# Look up the correct page for this anchor.
							anchor = match[1].slice(1, match[1].length - 1)
							if anchor_page_mappings.key?(anchor)
								# Construct the new link.
								anchor_page = anchor_page_mappings[anchor]
								linked_page_path = page_paths[anchor_page.to_i]
								if linked_page_path
									if !linked_page_path.slice(-1, 1).eql?("/")
										linked_page_path = "#{linked_page_path}/"
									end
									new_link_url = "#{linked_page_path}\##{anchor}"

									# Rewrite the link.
									anchor_offset = match.offset(1)[0] - match.pre_match.length
									link_start = match[0].slice(0, anchor_offset)
									anchor_end_offset = link_start.length + match[1].length
									link_end = match[0].slice(anchor_end_offset, match[0].length - anchor_end_offset)
									new_link = "#{link_start}#{new_link_url}#{link_end}"
									#puts "Will replace #{match[0]} with #{new_link}"
									page_content.gsub!(match[0], new_link)
								end
							end
						end
					}
				}
			end

			# Create suitable multipages for each page of the post's content.
			first_index = 0
			last_index = (num_pages - 1)
			
			# Reconstruct collated page from the other split pages, joining on the pagebreak template.
			pagebreak_include_tag = "\r\r{% include #{pagebreak_template} %}\r\r"
			reassembled_collated_content = pages_before_link_rewriting.slice(0, num_pages).join(pagebreak_include_tag)

			# Obtain basic rendered output of the collated page, for use in feeds etc.
			rendered_collated_page = MultiPage.new(site, site.source, File.dirname(post_original_path), post_original_name)
			rendered_collated_page.content = reassembled_collated_content
			rendered_collated_page.data = {}.merge(post_original_data) # make copy of hash
			rendered_collated_page.data["multipage"] = make_multipage_data(num_pages, collation_enabled, page_numbers, page_paths, page_titles, expanded_page_titles, collate_at_root, collated_path, true, "", first_index, last_index, pages.count - 1, collated_path, out_of_bounds_index_value, out_of_bounds_index_value, post_original_content)

			rendered_collated_page.render(site.layouts, site.site_payload)
			collated_page_rendered_content = rendered_collated_page.content

			# Process each page of content.
			pages.each_with_index { |page_content, page_num|

				# Create a page object at the correct path.
				page_slug_number = page_numbers[page_num]
				page_path = page_paths[page_num]
				is_collated_page = page_path.eql?(collated_path)
				is_root_first_page = !collate_at_root && page_num == 0
				is_non_root_collated_page = is_collated_page && !collate_at_root

				if !is_root_first_page
					# This could either be a (non-root) numbered page, or the collated page (root or otherwise).
					if !is_collated_page || is_non_root_collated_page
						# This is a non-root numbered page, or the non-root collated page. We need to create it.

						# Initially create the page with the post's page and name, so it can read metadata.
						new_page = MultiPage.new(site, site.source, File.dirname(post_original_path), post_original_name)

						# Now set the new page to have a suitable destination path and filename.
						new_page.dir = page_path
						new_page.name = "index.markdown" # Use markdown extension so content is converted.
						new_page.process(new_page.name) # Update internals regarding filename.
					else
						# This is the root page as the collated page.
						new_page = post
					end
				else
					# This is the root page as the first page of content.
					new_page = post
				end

				# Give this Page object the appropriate 'page' of the post's content.
				if !is_collated_page
					wrapped_page_content = page_content
				else
					wrapped_page_content = reassembled_collated_content
				end

				# Ensure the page has suitable auto-wrapped paging template content.
				paging_include_tag = "\r\r{% include #{paging_template} %}\r\r"
				if auto_wrap_paging && !(is_collated_page && !paging_on_collated_page)
					if paging_type != "footer"
						# Add paging header
						wrapped_page_content = "#{paging_include_tag}#{wrapped_page_content}"
					end
					if paging_type != "header"
						# Add paging footer
						wrapped_page_content = "#{wrapped_page_content}#{paging_include_tag}"
					end
				end

				# Also respect any manual requests for paging insertion.
				if !(is_collated_page && !paging_on_collated_page)
					wrapped_page_content.gsub!(@paging_regexp, paging_include_tag)
				end

				# Deal with any page_link tags.
				if !is_collated_page
					page_link_matches = wrapped_page_content.to_enum(:scan, @page_link_regexp).map { Regexp.last_match }
					page_link_matches.each { |match|
						linked_page_val = match[1].downcase
						val_is_number = false # If false, it's a zero-based index. If true, the actual page's number.
						if linked_page_val.slice(0, 1).eql?("n")
							val_is_number = true
							linked_page_val = linked_page_val.slice(1, linked_page_val.length - 1)
						end
						linked_page_num = linked_page_val.to_i
						linked_page_path = nil
						if !val_is_number
							# This is a zero-based page index.
							if linked_page_num > 0 && linked_page_num < page_paths.length
								linked_page_path = page_paths[linked_page_num]
							end
						else
							# This is the number assigned to the page.
							linked_path_index = page_numbers.find_index { |item| item.to_i == linked_page_num }
							if linked_path_index != nil
								linked_page_path = page_paths[linked_path_index]
							end
						end
						if linked_page_path
							if !linked_page_path.slice(-1, 1).eql?("/")
								linked_page_path = "#{linked_page_path}/"
							end
							wrapped_page_content.gsub!(match[0], linked_page_path)
						end
					}
				end

				# Provide the page with its prepared content.
				new_page.content = wrapped_page_content

				# Provide post's data for the page to use.
				new_page.data = {}.merge(post_original_data) # make copy of hash

				# Override this page's title as appropriate.
				new_page.data["title"] = expanded_page_titles[page_num]

				# Add some useful multipage-related data too.
				new_page.data["multipage"] = make_multipage_data(num_pages, collation_enabled, page_numbers, page_paths, page_titles, expanded_page_titles, collate_at_root, collated_path, is_collated_page, collated_page_rendered_content, first_index, last_index, page_num, page_path, out_of_bounds_index_value, page_slug_number, post_original_content)

				# Actualise all new, non-root pages.
				if !page_path.eql?(post_original_url)
					# Render and write the page out.
					new_page.render(site.layouts, site.site_payload)
					new_page.write(page_path)

					# Inform Jekyll that this page has been created.
					site.pages << new_page
				end
			}
		end

		def make_multipage_data(
			num_pages,
			collation_enabled,
			page_numbers,
			page_paths,
			page_titles,
			expanded_page_titles,
			collate_at_root,
			collated_path,
			is_collated_page,
			collated_page_rendered_content,
			first_index,
			last_index,
			page_num,
			page_path,
			out_of_bounds_index_value,
			page_slug_number,
			post_original_content
			)

			multipage_data = {}
			multipage_data["total_pages"] = num_pages
			multipage_data["page_numbers"] = collation_enabled ? page_numbers.slice(0, num_pages) : page_numbers
			multipage_data["page_paths"] = collation_enabled ? page_paths.slice(0, num_pages) : page_paths
			multipage_data["page_titles"] = collation_enabled ? page_titles.slice(0, num_pages) : page_titles
			multipage_data["expanded_page_titles"] = collation_enabled ? expanded_page_titles.slice(0, num_pages) : expanded_page_titles
			multipage_data["collation_enabled"] = collation_enabled
			multipage_data["collate_at_root"] = collate_at_root
			multipage_data["collated_path"] = collated_path
			multipage_data["collated_title"] = collation_enabled ? expanded_page_titles.last : ""
			multipage_data["is_collated_page"] = is_collated_page
			multipage_data["post_word_count"] = post_original_content.split.length
			multipage_data["post_original_content"] = post_original_content
			multipage_data["collated_page_rendered_content"] = collated_page_rendered_content
			multipage_data["first_path"] = page_paths[first_index]
			multipage_data["last_path"] = page_paths[last_index]
			multipage_data["first_number"] = page_numbers[first_index]
			multipage_data["last_number"] = page_numbers[last_index]
			multipage_data["first_title"] = page_titles[first_index]
			multipage_data["last_title"] = page_titles[last_index]
			multipage_data["first_expanded_title"] = expanded_page_titles[first_index]
			multipage_data["last_expanded_title"] = expanded_page_titles[last_index]
			multipage_data["page_index"] = page_num
			multipage_data["page_path"] = page_path
			multipage_data["page_number"] = is_collated_page ? out_of_bounds_index_value : page_slug_number
			multipage_data["page_title"] = page_titles[page_num]
			multipage_data["expanded_page_title"] = expanded_page_titles[page_num]
			if page_num > first_index && !is_collated_page
				previous_index = page_num - 1
				multipage_data["previous_path"] = page_paths[previous_index]
				multipage_data["previous_number"] = page_numbers[previous_index]
				multipage_data["previous_title"] = page_titles[previous_index]
				multipage_data["previous_expanded_title"] = expanded_page_titles[previous_index]
			else 
				multipage_data["previous_path"] = ""
				multipage_data["previous_number"] = out_of_bounds_index_value
				multipage_data["previous_title"] = ""
				multipage_data["previous_expanded_title"] = ""
			end
			if page_num < last_index && !is_collated_page
				next_index = page_num + 1
				multipage_data["next_path"] = page_paths[next_index]
				multipage_data["next_number"] = page_numbers[next_index]
				multipage_data["next_title"] = page_titles[next_index]
				multipage_data["next_expanded_title"] = expanded_page_titles[next_index]
			else 
				multipage_data["next_path"] = ""
				multipage_data["next_number"] = out_of_bounds_index_value
				multipage_data["next_title"] = ""
				multipage_data["next_expanded_title"] = ""
			end

			return multipage_data

		end

		def get_setting(setting, site, post_data, default)
			# Returns the most specific applicable value for the setting.
			if post_data.has_key?(setting)
				return post_data[setting]
			elsif site.config.has_key?(setting)
				return site.config[setting]
			end

			return default
		end

		def find_all_headings(input)
			if !input.kind_of?(String)
				return nil
			end
			heading_matches = input.to_enum(:scan, @heading_regexp).map { Regexp.last_match }
			headings = []
			heading_matches.each { |match|
				heading_data = {}
				match_offset = match.pre_match.length
				heading_data["match_offset_in_content"] = match_offset
				heading_data["entire_match_length"] = match[0].length
				if match.captures[0] != nil
					entire_match = match.captures[0]
					heading_text = match.captures[1]
					heading_offset = match.offset(2)[0] - match_offset # because the zero'th match is the whole pattern's.
					heading_type = "html"
				elsif match.captures[2] != nil
					entire_match = match.captures[2]
					heading_text = match.captures[3]
					heading_offset = match.offset(4)[0] - match_offset
					heading_type = "atx"
				elsif match.captures[4] != nil
					entire_match = match.captures[4]
					heading_text = match.captures[5]
					heading_offset = match.offset(6)[0] - match_offset
					heading_type = "setext"
				end
				heading_data["entire_match"] = entire_match
				heading_data["heading_text"] = heading_text
				heading_data["heading_length"] = heading_text.length
				heading_data["heading_offset_in_match"] = heading_offset
				heading_data["heading_type"] = heading_type

				# Work out the heading level.
				heading_level = 0
				if heading_type == "html" # e.g. <h3>
					# Take the number from the tag.
					heading_level = entire_match.slice(2, 1)
				elsif heading_type == "atx" # e.g. prefixed with ###
					# Count the number of prefixed "#" symbols.
					heading_level = /\s*(\#+)/.match(entire_match)[1].length
				else # setext e.g. heading underlined with === (h1) or --- (h2)
					# Check the last character of the entire match.
					heading_level = entire_match.slice(-1, 1).eql?("-") ? 2 : 1
				end
				heading_data["heading_level"] = heading_level

				# Determine the heading's ID, if present.
				heading_id = nil
				if heading_type == "html" # e.g. <h3>
					# See if the tag has an ID attribute.
					id_match = @id_regexp_html.match(entire_match)
					if id_match
						heading_id = id_match[1]
					end
				else
					# Check for the kramdown/PHP Markdown Extra attribute syntax
					id_match = @id_regexp_markdown.match(entire_match)
					if id_match
						heading_id = id_match[1]
					end
				end
				if !heading_id
					# Generate an ID from the text.
					heading_id = slugify(heading_text)
				end
				heading_data["heading_id"] = heading_id

				# Add this heading to the array.
				headings.push heading_data
			}

			return headings
		end

		def slugify(input)
			if input.kind_of? String
				return slug = input.strip.downcase.gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
			end
		end

		def process_multipages(site)
			# Find all posts that have the multipage front-matter.
			multi_posts = site.posts.find_all { |post|
				post.data[@multipage_frontmatter_key] == true
			}
			
			# Find all pages that have the multipage front-matter.
			multi_posts = multi_posts + site.pages.find_all { |post|
				post.data[@multipage_frontmatter_key] == true
			}

			# Create multipages.
			multi_posts.each { |post|
				create_multipage(post, site)
			}
		end

	end
	
	class MultiPageTag < Liquid::Tag
		def initialize(tag, text, tokens)
			# Deliberately empty.
		end

		def render(context)
			# Return an empty string. We handle these tags in the generator.
			""
		end
	end

	Liquid::Template.register_tag('page_break', MultiPageTag) # breaks posts into pages
	Liquid::Template.register_tag('paging', MultiPageTag) # inserts page-navigation template
	Liquid::Template.register_tag('page_title', MultiPageTag) # overrides page's title format
	Liquid::Template.register_tag('expanded_page_title', MultiPageTag) # overrides page's expanded title format
	Liquid::Template.register_tag('page_link', MultiPageTag) # allows linking to other pages on non-collated pages

end
