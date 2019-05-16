import { GraphQLServer } from 'graphql-yoga';

const users = [{
    id: '1',
    name: 'David',
    email: 'david@example.com',
    age: 27
  }, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
    age: 28
  }, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 30
  }]

const posts = [{
  id: '1',
  title: 'hello',
  body: 'hi there stranger',
  published: false
}, {
  id: '2',
  title: 'to hell and back',
  body: 'weird but great',
  published: true
}, {
  id: '3',
  title: 'weird cucumber',
  body: 'what is this book about?',
  published: true
}]

const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    users(query: String): [User]!
    posts(query: String): [Post]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
  Query: {
    // parent - useful when working with relational data
    // arguments - contains info we need, operation arguments supplied
    // context - useful for contextual data - might contain id
    // info - info sent along to the server
    users(parent, args, ctx, info){
      if (!args.query){
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    me(){
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com'
      }
    },
    post(){
      return {
        id: '1223',
        title: 'my food review',
        body: 'the food was so-so, could have had more spices',
        published: false
      }
    },
    posts(parent, args, ctx, info){
      if (!args.query){
        return posts
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    add(parent, args, ctx, info){
      if (args.numbers.length === 0){
        return 0
      }

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    },

    grades(parent, args, ctx, info){
      return [ 99, 80, 93]
    },

    greeting(parent, args, ctx, info){
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}.`
      } else {
        return 'Hello!'
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up');
})
