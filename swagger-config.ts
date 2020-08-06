export const swaggerSettings = {
  swaggerDefinition: {
      info: {
          description: 'Node API/Middleware',
          title: 'API/Middleware',
          version: '1.0.0',
      },
      host: 'localhost:3030',
      basePath: '/v1',
      produces: ["application/json", "application/xml"],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname,
  files: ['./routes.js'] 
}
