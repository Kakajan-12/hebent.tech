export type Video = {
  id: number;
  video: string;
};

export type Vacancy = {
  id: number;
  title_en: string;
  title_tk: string;
  title_ru: string;
  text_en: string;
  text_tk: string;
  text_ru: string;
};

export type Testimonial = {
  id: number;
  company: string;
  text: string;
  name: string;
  job_title: string;
};

export type Statistic = {
  id: number;
  title_tk: string;
  title_en: string;
  title_ru: string;
  count: number;
};

export type SocialLink = {
  id: number;
  icon: string;
  url: string;
};

export type Service = {
  id: number;
  image: string;
  service_name_tk: string;
  service_name_en: string;
  service_name_ru: string;
  title_tk: string;
  title_en: string;
  title_ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
};

export type Project = {
  id: number;
  created_at?: string;
  image: string;
  title_tk: string;
  title_en: string;
  title_ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  costumer_tk: string;
  costumer_en: string;
  costumer_ru: string;
  website: string;
};

export type ProjectDetail = {
  id: number;
  image: string;
  title_ru: string;
  website: string;
  gallery: Gallery[];
  details: ProjectDetailItem[];
};

export type ProjectDetailItem = {
  id: number;
  title_tk: string;
  title_en: string;
  title_ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  project_id: number;
};

export type Gallery = {
  id: number;
  images: string;
  project_id: number;
};

export type Phone = {
  id: number;
  number: string;
};

export type NewsCategory = {
  id: number;
  category_tk: string;
  category_en: string;
  category_ru: string;
};

export type NewsItem = {
  id: string;
  title_tk: string;
  title_en: string;
  title_ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  created_at: string;
  category_id: number;
  image: string;
  category_tk: string;
  category_en: string;
  category_ru: string;
};

export type NewsDetail = {
  id: number;
  image: string;
  title_tk: string;
  title_en: string;
  title_ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  category_id: number;
  category_tk: string;
  category_en: string;
  category_ru: string;
  created_at: string;
  gallery: NewsDetailGallery[];
};

export type NewsDetailGallery = {
  id: number;
  image: string;
  news_id: number;
};

export type VacancyResponse = {
  id: number;
  vacancy_id: number;
  vacancy_title_ru: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  cv: string;
  portfolio: string;
  created_at: string;
};

export type ContactResponse = {
  name: string;
  surname: string;
  email: string;
  message: string;
  captchaText: string;
};
