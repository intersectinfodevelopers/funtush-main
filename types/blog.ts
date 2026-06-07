export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  category: string;
  image_url: string;
  published_at: string;
  read_time_minutes: number;
}
