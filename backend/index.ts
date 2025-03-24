import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape', async (req: any, res: any) => {
  console.log('Done', req.body);
  return res.status(200).json({ message: 'Scraping done!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
