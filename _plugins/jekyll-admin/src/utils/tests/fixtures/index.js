export const state = {
  metadata: {
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
    mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
  },
  new_field_count: 0
};

export const emptyState = {
  metadata: {},
  new_field_count: 0
};

export const config = {
  content: {
    defaults: [
      {
        scope: {
          path: ''
        },
        values: {
          some_front_matter: 'default'
        }
      },
      {
        scope: {
          type: 'posts',
          path: ''
        },
        values: {
          post_field: 'default'
        }
      },
      {
        scope: {
          type: 'pages',
          path: 'test'
        },
        values: {
          page_field: 'default'
        }
      }
    ]
  }
};
