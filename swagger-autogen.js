import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/email.js']; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation generated!');
});
