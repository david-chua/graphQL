import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL is amazing!');
});
// root resolver: returns the data we need
const root = { friend: () => {
  return {
    "id": 28718992,
    "firstName": "David",
    "lastName": "Chua",
    "gender": "Male",
    "language": "English",
    "email": "someEmail@me.com"
  }
} }

// we'll pass the query and graphiql is able to test.
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port localhost:8080/graphql'));
