---
layout: post
title: You're up and running!
tags: tag1,tag2, c++, xyz
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

Some Code lets see how it looks:

```cpp
class char_array_buffer : public std::streambuf {
public:
    char_array_buffer(const char *data, unsigned int len);
 
private:
    int_type underflow();
    int_type uflow();
    int_type pbackfail(int_type ch);
    std::streamsize showmanyc();
 
    const char * const begin_;
    const char * const end_;
    const char * current_;
};
 
char_array_buffer::char_array_buffer(const char *data, unsigned int len)
: begin_(data), end_(data + len), current_(data) { }
 
char_array_buffer::int_type char_array_buffer::underflow() {
    if (current_ == end_) {
        return traits_type::eof();
    }
    return traits_type::to_int_type(*current_);     // HERE!
}
 
char_array_buffer::int_type char_array_buffer::uflow() {
    if (current_ == end_) {
        return traits_type::eof();
    }
    return traits_type::to_int_type(*current_++);   // HERE!
}
 
char_array_buffer::int_type char_array_buffer::pbackfail(int_type ch) {
    if (current_ == begin_ || (ch != traits_type::eof() && ch != current_[-1])) {
        return traits_type::eof();
    }
    return traits_type::to_int_type(*--current_);   // HERE!
}
 
std::streamsize char_array_buffer::showmanyc() {
    return end_ - current_;
```

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
