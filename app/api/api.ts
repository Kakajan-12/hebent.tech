import { BASE_API_URL } from "@/constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Video,
  Vacancy,
  Testimonial,
  Statistic,
  SocialLink,
  Service,
  Project,
  ProjectDetail,
  ProjectDetailItem,
  Gallery,
  Phone,
  NewsCategory,
  NewsItem,
  NewsDetail,
  NewsDetailGallery,
  VacancyResponse,
  ContactResponse,
} from "@/app/Interfaces/interfaces";

export const hebent = createApi({
  reducerPath: "hebent",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => {
    const createGetQuery = <T>(endpoint: string) =>
      builder.query<T[], void>({
        query: () => `/${endpoint}`,
      });
    const getElementByIds = <T>(endpoint?: string, id?: string | number) =>
      builder.query<T | undefined, { endpoint: string; id?: string | number }>({
        query: ({ endpoint, id }: { endpoint: string; id: string | number }) =>
          `/${endpoint}/${id}`,
      });
    return {
      getVideos: createGetQuery<Video>("api/videos"),
      getVacancies: createGetQuery<Vacancy>("api/vacancy"),
      getTestimonials: createGetQuery<Testimonial>("api/testimonials"),
      getStatistics: createGetQuery<Statistic>("api/statistics"),
      getSocialLinks: createGetQuery<SocialLink>("api/social-links"),
      getServices: createGetQuery<Service>("api/services"),
      getProjects: createGetQuery<Project>("api/projects"),
      getPhones: createGetQuery<Phone>("api/phone"),
      getNewsCategory: createGetQuery<NewsCategory>("api/news-category"),
      getNews: createGetQuery<NewsItem>("api/news"),

      getGalleryById: getElementByIds<Gallery[]>(),
      getProjectDetailById: getElementByIds<ProjectDetail>(),
      getProjectDetailItemsById: getElementByIds<ProjectDetailItem[]>(),
      getNewsDetailById: getElementByIds<NewsDetail>(),
      getNewsDetailGalleryById: getElementByIds<NewsDetailGallery[]>(),

      applyJob: builder.mutation<VacancyResponse, FormData>({
        query: (formData) => ({
          url: "/api/vacancy-responses",
          method: "POST",
          body: formData,
        }),
      }),
      sendContact: builder.mutation<ContactResponse, FormData>({
        query: (formData) => ({
          url: "/api/send-mail",
          method: "POST",
          body: formData,
        }),
      }),
    };
  },
});

export const {
  useGetVideosQuery,
  useGetVacanciesQuery,
  useGetTestimonialsQuery,
  useGetStatisticsQuery,
  useGetSocialLinksQuery,
  useGetServicesQuery,
  useGetProjectsQuery,
  useGetPhonesQuery,
  useGetNewsCategoryQuery,
  useGetNewsQuery,
  useGetGalleryByIdQuery,
  useGetProjectDetailByIdQuery,
  useGetProjectDetailItemsByIdQuery,
  useGetNewsDetailByIdQuery,
  useGetNewsDetailGalleryByIdQuery,
  useApplyJobMutation,
  useSendContactMutation,
} = hebent;
