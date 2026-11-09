# SEO Keywords

本文件记录 TIMYOO Apparel 网站的 SEO 关键词方向。涉及页面标题、meta description、OG/Twitter metadata、结构化数据、页面正文、H1/H2、路由或新页面规划时，先阅读本文件。

## SEO Positioning

早期 SEO 的主战场不是品牌词 `TIMYOO` 或 `TIMYOO Apparel`，而是有采购意图的非品牌词。

核心定位：

- Cambodia apparel manufacturer
- Cambodia garment factory
- Southeast Asia apparel manufacturer
- Southeast Asia garment factory
- apparel sourcing Cambodia
- garment production Cambodia

品牌词用途：

- `TIMYOO Apparel` 用作品牌实体名，放在 title 后半段、页脚、结构化数据、OG/Twitter metadata 中。
- `TIMYOO` 用作简称、logo 品牌名和 `alternateName`。
- 不要把 `TIMYOO Apparel` 当作早期获客主关键词。

## Primary Keywords

优先级最高，适合首页、核心 landing page、H1/H2、title 和 description：

- Cambodia apparel manufacturer
- Cambodia garment factory
- apparel manufacturer in Cambodia
- garment factory in Cambodia
- Southeast Asia apparel manufacturer
- Southeast Asia garment factory
- apparel sourcing Cambodia
- garment production Cambodia
- overseas apparel manufacturing
- apparel manufacturing partner

## Product Keywords

适合产品页、产品卡片、图片 alt、集合页和细分 landing page：

- chef wear manufacturer
- chef wear manufacturer in Cambodia
- chef uniform manufacturer
- kitchen workwear manufacturer
- commercial apron manufacturer
- apron manufacturer in Cambodia
- hospitality uniform manufacturer
- hospitality workwear supplier
- casualwear manufacturer
- casualwear manufacturer in Southeast Asia
- lifestyle apparel manufacturer
- repeat apparel production

## Buyer Intent Keywords

适合正文、case studies、FAQ、服务说明和 CTA 附近：

- reduce apparel sourcing costs
- reliable garment factory
- repeat garment production
- stable apparel production capacity
- apparel supplier for global brands
- factory direct apparel manufacturer
- low tariff apparel sourcing
- audit-ready garment factory
- quality control apparel manufacturing

## Title Patterns

页面 title 优先使用“非品牌获客词 + 品牌词”的顺序：

- `Cambodia Apparel Manufacturer | TIMYOO Apparel`
- `Southeast Asia Garment Factory | TIMYOO Apparel`
- `Chef Wear Manufacturer in Cambodia | TIMYOO Apparel`
- `Commercial Apron Manufacturer in Cambodia | TIMYOO Apparel`
- `Casualwear Manufacturer in Southeast Asia | TIMYOO Apparel`

避免：

- `TIMYOO Apparel | Cambodia Apparel Manufacturer`
- `TIMYOO Apparel Cambodia`
- keyword stuffing 或重复堆砌同义词。

## Description Pattern

meta description 应该自然覆盖目标词、地点、产品类型和采购意图。

推荐结构：

`Cambodia-based apparel manufacturer serving global brands with [product categories], repeat garment production, stable capacity, and Southeast Asia sourcing support.`

## Brand Entity

结构化数据中使用：

- `name`: `TIMYOO Apparel`
- `alternateName`: `TIMYOO`
- `url`: `https://www.timyooapparel.com/`

品牌词负责建立实体识别，非品牌词负责获客流量。

## Website SEO Structure

当前网站采用“工厂能力词 + 产品转化词”的双线 SEO 结构。

工厂能力词负责建立 TIMYOO Apparel 是谁、在哪里生产、是否可信：

- 首页主打：`Cambodia apparel manufacturer`
- 工厂页主打：`Southeast Asia garment factory`
- 工厂页辅助：`Cambodia garment factory`
- 内容辅助：`apparel sourcing Cambodia`、`garment production Cambodia`

产品转化词负责承接更明确的采购需求：

- Aprons 页主打：`commercial apron manufacturer`
- Chef Wear 页主打：`chef wear manufacturer`
- Casuals 页主打：`casualwear manufacturer in Southeast Asia`

后续新增页面优先方向：

- `/hospitality-uniform-manufacturer/`: `hospitality uniform manufacturer`
- `/workwear-manufacturer-cambodia/`: `workwear manufacturer in Cambodia`
- `/fashion-apparel-manufacturer/`: `fashion apparel manufacturer`
- `/apparel-sourcing-cambodia/`: `apparel sourcing Cambodia`

不要用 `Zara` 作为页面 title、H1 或主 SEO 关键词。可以在内部定位中理解为 fast-fashion / lifestyle apparel / woven pants 类生产能力，但对外关键词使用非品牌词。

## Current Page Title Map

现有页面 title 应保持“非品牌获客词 + 品牌词”的结构：

- Home: `Cambodia Apparel Manufacturer | TIMYOO Apparel`
- Factory page: `Southeast Asia Garment Factory | TIMYOO Apparel`
- Aprons page: `Commercial Apron Manufacturer in Cambodia | TIMYOO Apparel`
- Chef Wear page: `Chef Wear Manufacturer in Cambodia | TIMYOO Apparel`
- Casuals page: `Casualwear Manufacturer in Southeast Asia | TIMYOO Apparel`

## Landing Page Targets

- `/southeast-asia-garment-factory/`: primary broad factory landing page for `Southeast Asia garment factory`, supported by Cambodia factory proof, production photos, facility photos, and links to product categories.

## GEO Baseline (2026-10-21)

- 保留现有页面结构，不增加 FAQ / Question 区块，不以 FAQ schema 作为收录手段。
- 公开搜索已发现工厂页和围裙页；这不是 Google Search Console 的全量收录结论，也不代表 ChatGPT 已推荐公司。
- 线上 `/assets/logo.svg` 实测返回 HTTP 200 和首页 HTML，且出现在搜索结果中。本次改为实际输出的 SVG URL，并生成顶层 `404.html`。发布后仍需复查未知 URL 的 HTTP 状态，以及是否存在 Cloudflare 自定义重写规则。
- 各业务页都输出同一个 Organization 和 WebSite 实体，每个 `@id` 只出现一次；产品 CollectionPage 关联该公司。
- 首页和工厂页原有介绍明确表达公司、Cambodia 生产地点及 chef wear / aprons / casualwear 品类，避免描述“买家如何搜索”的空泛文案。
- 产品页在已有介绍区链接工厂页和询盘邮箱。新内容不添加未经核实的产能、认证、客户、排名或交期承诺。

发布后复核：

1. 检查真实 logo URL 返回 SVG，随机不存在的页面返回 404，现有 sitemap 页面仍返回 200。
2. 在有访问权限的 Search Console / Bing Webmaster Tools 中检查 canonical 和收录情况，按需提交 sitemap；公开 `site:` 搜索不能代替这些工具。
3. 核对真实 Cloudflare 爬虫日志，确认 OAI-SearchBot 未被挑战或拦截。仅模拟 User-Agent 的 200 响应不证明真实爬虫畅通。
4. 使用固定采购问题记录日期、是否启用联网搜索、提及厂家、引用 URL；与 GA4 的 AI 来源访问和邮箱点击一起评估。
5. 认证目录、地图、公司 LinkedIn 等站外资料需先核实归属、地址及有效期，再建立关联。不要把个人主页自动标为公司 `sameAs`。

参考：[Cloudflare Pages 路由与 404 行为](https://developers.cloudflare.com/pages/configuration/serving-pages/)。
