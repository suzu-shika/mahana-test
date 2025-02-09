// SDK利用準備
// import type { arrayOutputType } from "astro:schema";
import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  // MicroCMSListResponse,
  // MicroCMSImage,
  // MicroCMSListContent,
} from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ImageField
// 型定義
export type ImageField = {
  url: string;
  width: string;
  height: string;
};

// menu
// 型定義
export type Menu = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  // title: string;
  content: string;
  menu_name: string;
  url: string;
  menu_time: string;
  menu_price: string;
  menu_lead: string;
  menu_notes: string;
  menu_description: string;
};
export type MenuResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Menu[];
};
// APIの呼び出し
// 全メニュー取得
export const getMenus = async (queries?: MicroCMSQueries) => {
  return await client.get<MenuResponse>({ endpoint: "menu", queries });
};
// 特定のメニュー取得
export const getMenuDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Menu>({
    endpoint: "menu",
    contentId,
    queries,
  });
};

// option-menu
// 型定義
export type Option = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  // title: string;
  content: string;
  option_name: string;
  url: string;
  option_time: string;
  option_price: string;
  option_lead: string;
  option_notes: string;
  option_description: string;
};
export type OptionResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Option[];
};
// APIの呼び出し
// 全オプションメニュー取得
export const getOptions = async (queries?: MicroCMSQueries) => {
  return await client.get<OptionResponse>({ endpoint: "option-menu", queries });
};
// 特定のオプションメニュー取得
export const getOptionDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Option>({
    endpoint: "option-menu",
    contentId,
    queries,
  });
};

// blog
// 型定義
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  url: string;
  // thumbnail: string;
  thumbnail?: { url: string }; // string → { url: string } に修正
  category: string[];
  main_text: string;
  is_recommended: boolean; // おすすめ記事フラグ
  recommend_order: number; // 表示順
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};
// APIの呼び出し
// 全ブログ記事取得
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.get<BlogResponse>({ endpoint: "blog", queries });
};
// 特定のブログ記事取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId,
    queries,
  });
};
// おすすめ記事（最大3件）取得
export const getRecommendedBlogs = async () => {
  return await client.get<BlogResponse>({
    endpoint: "blog",
    queries: {
      filters: "is_recommended[equals]true",
      orders: "recommend_order",
      limit: 3,
    },
  });
};

// 最新のブログ記事を取得する関数
export const getLatestBlogPost = async () => {
  const response = await client.get<BlogResponse>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt", // 公開日で降順にソート
      limit: 1, // 1件だけ取得
    },
  });
  return response.contents[0]; // 最新の記事を返す
};
