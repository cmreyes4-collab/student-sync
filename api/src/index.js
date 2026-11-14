import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'student-sync-api' });
});

app.listen(PORT, () => {
  console.log(`Student Sync API listening on http://localhost:${PORT}`);
});
