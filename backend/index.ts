import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape', async (req: any, res: any) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  return res.status(200).json({ message: keyword });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
