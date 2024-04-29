import express from 'express';
import cors from 'cors';
import proveedorRouter from './routes/proveedores';

const app = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

const PORT = 8080;

app.use('/api/proveedores', proveedorRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});