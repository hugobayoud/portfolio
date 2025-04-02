import fs from 'fs';
import path from 'path';

export interface Article {
  title: string;
  slug: string;
  date: string;
}

export function getArticles(): Article[] {
  const articlesDirectory = path.join(process.cwd(), 'src/app/blog');
  const articles: Article[] = [];

  const entries = fs.readdirSync(articlesDirectory, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory() && entry.name !== 'components') {
      const fullPath = path.join(articlesDirectory, entry.name, 'page.mdx');

      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Extract title from H1
        const titleMatch = fileContents.match(/^# (.*$)/m);
        const title = titleMatch ? titleMatch[1] : entry.name;

        // Extract date from paragraph with data-key="date"
        const dateMatch = fileContents.match(/<p data-key="date">(.*?)<\/p>/);
        const date = dateMatch ? dateMatch[1].trim() : '01/01/2024';

        articles.push({
          title,
          slug: entry.name,
          date,
        });
      }
    }
  });

  // Sort articles by date (most recent first)
  return articles.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    return (
      new Date(+yearB, +monthB - 1, +dayB).getTime() -
      new Date(+yearA, +monthA - 1, +dayA).getTime()
    );
  });
}
