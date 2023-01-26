import express from "express";
import { config } from "dotenv";
import { graphqlHTTP } from 'express-graphql';
// import { graphqlSchema } from './graphql/schema';
// import * as graphqlResolvers from './graphql/resolvers';

import { schema as graphqlSchema } from "./graphql/schema";

import { sequelize } from './connections/sequalize';
import { resolveJwt } from "./controllers/auth/resolveJwt";
import { router as musicFileRouter } from './routes/musicFiles';
import { configCors } from "./controllers/general/configCors";
import { errorReqHandler } from "./controllers/general/errorReqGeneral";
import { acceptOptions } from "./controllers/general/acceptOptins";

// Reading .env into process.env
config();

const app = express();

// Set utility middleware
app.use(configCors);
app.use(resolveJwt());

// Configure graphql, setting schema and resolvers
app.use('/graphql', acceptOptions, graphqlHTTP({
    // schema: graphqlSchema,
    // rootValue: graphqlResolvers,
    schema: graphqlSchema,
    graphiql: true
}));

// Set REST endpoints
app.use('/music-data', musicFileRouter);

// Error handler route
app.use(errorReqHandler);

// Initialize db
sequelize.sync({

});

app.listen(process.env.PORT);



// TESTING
// import { AwsS3 } from './connections/awsS3';

// // const fileName = "C:\\Dev\\web-music\\web-music-server\\data\\music_uploads\\SimpleText.txt";

// const S3Instance = AwsS3.getInstance();

// S3Instance.getObjectMeta('00fe9cdc-ec05-4ab2-b7a8-9e00d01112c7/music_file.mp3');

// S3Instance.listObjectsOfKey('');
