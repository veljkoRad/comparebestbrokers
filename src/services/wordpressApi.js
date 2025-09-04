import axios from "axios";

const api = axios.create({
  baseURL: "https://comparebestbrokers.com/cbb_wp/wp-json",
});

// Fetchers
const getPosts = () => api.get("/wp/v2/posts?_embed").then(r => r.data);
const getBrokers = () => api.get("/wp/v2/brokers?orderby=menu_order&order=asc").then(r => r.data);
const getCategories = () => api.get("/wp/v2/categories").then(r => r.data);
const getMenus = () => api.get("/wp-menus/v1/menus/navMenu").then(r => r.data);
const getOptions = () => api.get("/acf/v2/options").then(r => r.data);

// Mappers

const mapPosts = posts => posts.map(post => {
   const tags = post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name) || [];
  return {
  id: post.id,
  title: post.title?.rendered ?? "",
  content: post.content?.rendered ?? "",
  imageLarge:
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url
    || "https://comparebestbrokers.com/cbb_wp/wp-content/uploads/2025/09/no-image-icon.webp",
  slug: post.slug,
  categoryName: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
  date: (post.date || "").slice(0, 10),
  author: post._embedded?.author?.[0]?.name || "Admin",
  tags: tags.length > 0 ? tags : ["News"],
}});

const mapMenus = items => items.map(i => ({
  id: i.ID,
  title: i.post_title,
  url: i.url,
  submenu: i.menu_item_parent,
}));

const mapBrokers = items => items.map(broker => ({
  id: broker.id,
  name: broker.acf?.broker_name || broker.title?.rendered || "",
  logo: broker.acf?.broker_logo?.url
    || "https://comparebestbrokers.com/cbb_wp/wp-content/uploads/2025/08/picture_14534501.png",
  rating: broker.acf?.rating || 0,
  minDeposit: broker.acf?.minimum_deposit ?? null,
  depositCurrencies: broker.acf?.deposit_currencies ?? null,
  fees: broker.acf?.fees ?? null,
  maximum_leverage: broker.acf?.maximum_leverage ?? null,
  button: broker.acf?.cta_button_url ?? null,
  ctaTop: broker.acf?.broker_cta_1 ?? null,
  ctaMid: broker.acf?.broker_cta_2 ?? null,
  ctaBottom: broker.acf?.broker_cta_3 ?? null,
  slug: broker.slug,
  shortDescription: broker.acf?.short_description ?? null,
  keyBenefits: broker.acf?.key_benefits ?? null,
}));

const mapACF = data => ({
  home: {
    heroImage: data.acf?.home?.hero_image || "",
    heroTitleWhite: data.acf?.home?.hero_title_white || "",
    heroTitleBlue: data.acf?.home?.hero_title_blue || "",
    heroSubtitle: data.acf?.home?.hero_subtitle || "",
    heroButtonLink: data.acf?.home?.hero_button_link || "",
    heroButtonText: data.acf?.home?.hero_button_text || "",
    bannerLink: data.acf?.home?.banner_link || "",
    bannerImage: data.acf?.home?.banner_image || "",
    banner2Link: data.acf?.home?.banner_2_link || "",
    banner2Image: data.acf?.home?.banner_2_image || "",
    banner3Link: data.acf?.home?.banner_3_link || "",
    banner3Image: data.acf?.home?.banner_3_image || "",
    homeBlogsTitle: data.acf?.home?.home_blogs_title || "",
    homeBlogsSubtitle: data.acf?.home?.home_blogs_subtitle || "",
    homeBrokersTitle: data.acf?.home?.home_brokers_title || "",
    homeBrokersSubtitle: data.acf?.home?.home_brokers_subtitle || "",
  },
  footer: {
    copyright: data.acf?.footer?.copyright_text || "",
    risk: data.acf?.footer?.risk_warning_text || "",
    facebook: data.acf?.footer?.facebook_link || "",
    instagram: data.acf?.footer?.instagram_link || "",
    linkedin: data.acf?.footer?.linkedin_link || "",
  },
  header: {
    logo: data.acf?.header?.logo || "",
  },
  blogs: {
    title: data.acf?.blogs?.blogs_title || "",
    subtitle: data.acf?.blogs?.blogs_subtitle || "",
  },
  brokers: {
    title: data.acf?.brokers?.brokers_title || "",
    subtitle: data.acf?.brokers?.brokers_subtitle || "",
  },
  sidebar: {
    brokersSidebarTitle: data.acf?.sidebar?.brokers_sidebar_title || "",
    sidebarBannerLink: data.acf?.sidebar?.sidebar_banner_link || "",
    sidebarBannerImage: data.acf?.sidebar?.sidebar_banner_image?.url || "",
  },
  blog_2: {
    title: data.acf?.blog_2?.blog_2_title || "",
    content: data.acf?.blog_2?.blog_2_content || "",
    image: data.acf?.blog_2?.blog_2_image || "",
  },
});

export const loadInitialData = async () => {
  const [posts, brokers, menus, categories, options] = await Promise.all([
    getPosts(),
    getBrokers(),
    getMenus(),
    getCategories(),
    getOptions(),
  ]);

  return {
    posts: mapPosts(posts),
    brokers: mapBrokers(brokers),
    menus: mapMenus(menus),
    categories: categories.map(c => c.name).filter(c => c !== "Uncategorized"),
    acf: mapACF(options),
  };
};