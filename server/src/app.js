import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(helmet());
app.use(
  cors({
    origin: clientOrigin
  })
);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

export default app;
