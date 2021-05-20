export const config = {
  title: 'Awesome Title',
  gems: 'jekyll-admin'
};

export const config_yaml = "title: Awesome Title\ngems: jekyll-admin";

export const collections = [
  {
    label: "posts",
    files: [],
    directory: "/jekyll-admin/spec/fixtures/site/_posts",
    relative_directory: "_posts",
    permalink: "/:categories/:year/:month/:day/:title:output_ext",
    http_url: null,
    api_url: "http://localhost:4000/_api/collections/posts"
  },
  {
    label: "puppies",
    files: [],
    directory: "/jekyll-admin/spec/fixtures/site/_puppies",
    relative_directory: "_puppies",
    foo: "bar",
    http_url: null,
    api_url: "http://localhost:4000/_api/collections/puppies"
  }
];

export const doc = {
  path: "_puppies/rover.md",
  id: "/puppies/rover",
  relative_path: "_puppies/rover.md",
  url: "/puppies/rover.html",
  collection: "puppies",
  draft: false,
  categories: [],
  some_front_matter: "default",
  title: "Rover",
  breed: "Golden Retriever",
  slug: "rover",
  ext: ".md",
  tags: [],
  date: "2016-08-31 23:02:41 +0300",
  http_url: null,
  api_url: "http://localhost:4000/_api/collections/puppies/rover.md"
};

export const collection = {
  label: "puppies",
  files: [],
  directory: "/jekyll-admin/spec/fixtures/site/_puppies",
  relative_directory: "_puppies",
  foo: "bar",
  http_url: null,
  api_url: "http://localhost:4000/_api/collections/puppies",
  documents: [doc]
};

export const new_doc = {
  collection: "movies",
  raw_content: "# Test Document",
  title: "The Revenant",
  path: "the-revenant.md",
  foo: "bar"
};

export const post = {
  path: "2016-04-01-awesome-post.md",
  id: "/2016/04/01/awesome-post",
  relative_path: "_post/awesome-post.md",
  url: "/posts/awesome-post.html",
  collection: "posts",
  draft: false,
  categories: [],
  some_front_matter: "default",
  title: "Awesome Post",
  slug: "awesome-post",
  ext: ".md",
  tags: [],
  date: "2016-04-01 00:00:00 +0200",
  http_url: null,
  api_url: "http://localhost:4000/_api/collections/posts/awesome-post.md"
};

export const new_post_with_date = {
  collection: "posts",
  raw_content: "# Test Post",
  title: "Awesome Post",
  date: "2016-04-01 00:00:00 +0200",
  path: "2016-04-01-awesome-post.md",
  foo: "bar"
};

export const page = {
  name: "page.md",
  raw_content: "# This is the base Jekyll theme.",
  dir: "/",
  http_url: "http://localhost:4000/page.html",
  path: "page.md",
  front_matter: {
    foo: "bar"
  }
};

export const new_page = {
  raw_content: "# This is the base Jekyll theme.",
  path: "page.md",
  title: "Page",
  foo: "bar"
};

export const draft = {
  raw_content: "# Test Draft\n",
  name: "draft-post.md",
  path: "_drafts/draft-post.md",
  relative_path: "draft-post.md",
  title: "Draft Post",
  slug: "draft-post",
  collection: "posts",
  draft: true,
  id: "/2017/05/09/draft-post",
  date: "2017-05-09 00:00:00 +0200",
  http_url: "/2017/05/09/draft-post.html",
  front_matter: {
    title: "Draft Post"
  }
};

export const publishedDraft = {
  raw_content: "# Test Draft\n",
  name: "draft-post.md",
  relative_path: "draft-post.md",
  title: "Draft Post",
  slug: "draft-post",
  collection: "posts",
  draft: true,
  front_matter: {
    title: "Draft Post"
  }
};

export const new_draft = {
  raw_content: "# Test Draft\n",
  name: "draft-post.md",
  path: "_drafts/draft-post.md",
  relative_path: "draft-post.md",
  title: "Draft Post",
  slug: "draft-post",
  collection: "posts",
  draft: true,
  id: "/2017/05/09/draft-post",
  date: "2017-05-09 00:00:00 +0200",
  http_url: "/2017/05/09/draft-post.html",
  front_matter: {
    title: "Draft Post"
  }
};

export const state = {
  body: 'Google summer of code is awesome',
  path: 'gsoc.md',
  title: 'Google Summer of Code',
  published: true,
  layout: "post",
  categories: "gsoc",
  students: [
    "GSoC Students",
    {
      name: {
        first: "Mert",
        last: "Kahyaoğlu"
      },
      email: [
        "mertkahyaoglu93@gmail.com",
        "test@gmail.com"
      ],
      username: "mertkahyaoglu"
    },
    {
      name: {
        first: "Ankur",
        last: "Singh"
      },
      email: "ankur13019@iiitd.ac.in",
      username: "rush-skills"
    }
  ],
  mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"],
  new_field_count: 0
};

export const datafile = {
  path: "_data/data_file.yml",
  relative_path: "data_file.yml",
  slug: "data_file",
  ext: ".yml",
  title: "Data File",
  raw_content: "foo: bar\n",
  content: {
    foo: "bar"
  }
};

export const staticfile = {
  extname: ".html",
  modified_time: "2016-08-11 23:40:41 +0300",
  path: "/index.html",
  encoded_content: "PGh0bWw+CiAgPGJvZHk+CiAgICBZb3UncmUgcHJvYmFibHkgbG9va2luZyBm"
};
