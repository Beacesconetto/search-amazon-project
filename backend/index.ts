import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/scrape', async (req: any, res: any) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  try {
    const url = `https://lista.mercadolivre.com.br/${encodeURIComponent(keyword)}#D[A:${encodeURIComponent(keyword)}]`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
    })

    const dom = new JSDOM(data);
    const document = dom.window.document;


    const items = document.querySelectorAll('.ui-search-layout__item');

    const results: any[] = [];

    console.log('items', items.length)

    for (const item of items) {
      const title = item.querySelector('.poly-component__title')?.textContent?.trim();
      const price = item.querySelector('.poly-price__current')?.textContent?.trim();
      const link = item.querySelector('.poly-component__title')?.getAttribute('href');
      const divComImagem = item.querySelector('.poly-card__portada'); 
      const image = divComImagem?.querySelector('img')?.getAttribute('src'); 
      const starsText = item.querySelector('.poly-component__reviews')?.textContent;

      let rating = '';
      let totalReviews = '';

      if (starsText) {
        const match = starsText.match(/Avaliação\s([\d,]+)\sde\s5\.\s\(([\d,.]+)\savaliações\)/);
        if (match) {
          rating = match[1]; 
          totalReviews = match[2].replace('.', '').replace(',', ''); 
        }
      }

      if (title && price && link && image) {
        results.push({ title, price, link, image, rating, totalReviews  });
      } else {
        console.log("Item não completo ou não encontrado, pulando.");
      }
    }

    return res.json(results);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
