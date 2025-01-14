// const Promise = require('bluebird')
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const { data } = await graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
      `
  );
  const posts = data.allContentfulBlogPost.edges;
  posts.forEach((post, index) => {
    createPage({
      path: `/blog/${post.node.slug}/`,
      component: blogPost,
      context: {
        slug: post.node.slug
      },
    })
  });

  // return new Promise((resolve, reject) => {
  //   const blogPost = path.resolve('./src/templates/blog-post.js')
  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allContentfulBlogPost {
  //             edges {
  //               node {
  //                 title
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //         `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors)
  //         reject(result.errors)
  //       }

  //       const posts = result.data.allContentfulBlogPost.edges
  //       posts.forEach((post, index) => {
  //         createPage({
  //           path: `/blog/${post.node.slug}/`,
  //           component: blogPost,
  //           context: {
  //             slug: post.node.slug
  //           },
  //         })
  //       })
  //     })
  //   )
  // })
}
