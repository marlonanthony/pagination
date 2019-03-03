const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql') 
const axios = require('axios')

// Post Type
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    text: { type: GraphQLString },
    date: { type: GraphQLString },
    _id: { type: GraphQLString }
  })
})

// Root Query 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return axios.get('http://localhost:5000/posts')
        .then(res => res.data)
      }
    },
    post: {
      type: PostType,
      args: {
        _id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get('http://localhost:5000/posts/' + args. _id)
        .then(res => res.data) 
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})