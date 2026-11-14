# GA4 流量查询说明

本文记录 TimYoo 网站通过 Google Analytics 4 Data API 查询流量的方法。

## 项目信息

- GA4 媒体资源 ID：`543672900`
- GA4 属性名称：`TimYooApparel`
- Google Cloud 项目：`SeedBySea`
- Data API：`Google Analytics Data API`
- 服务账号：`timyoo-ga4-reporting@seedbysea.iam.gserviceaccount.com`
- 服务账号角色：GA4 媒体资源“查看者”
- 本地密钥：`/Users/liuamao/Downloads/seedbysea-44bb627bcc0d.json`

> JSON 密钥只保存在本机，不要提交到 Git、上传到网站或粘贴到聊天中。

## 一条命令查询流量与来源

在项目目录执行（Node.js 22.6+，系统需安装 curl）：

```bash
GOOGLE_APPLICATION_CREDENTIALS="/Users/liuamao/Downloads/seedbysea-44bb627bcc0d.json" npm run analytics:report -- --days 7
```

默认查询最近 7 个完整自然日，不含今天，按 GA4 属性时区计算。
需要包含今天时加 `--include-today`；最近 30 天改为 `--days 30`。

本机访问 Google 需要代理时，在命令前增加 `HTTPS_PROXY=http://127.0.0.1:7893`（以实际代理端口为准）。
脚本只申请 `analytics.readonly` 权限，不修改 GA4 配置，也不写入访问事件。

返回 JSON 包括：

- `overview`：整个区间的去重用户、活跃用户、会话、页面浏览量。
- `daily`：每天的访问数据；没有访问的日期可能不返回行，不是报错。
- `countries`：国家分布。
- `sources`：本次会话的渠道、来源/媒介、活动，以及对应访问量。
- `emailClicksBySource`：按相同来源维度统计邮箱点击次数和点击用户数。

`totalUsers` 表示去重用户，`activeUsers` 表示活跃用户，不是同一个指标。
各天、各来源的用户数不要直接相加当作总 UV；总 UV 使用 `overview`。
邮箱事件的 `eventCount` 才是点击次数，不是 `totalUsers`。
输出保留 `metadata`（时区、阈值、采样等信息）；如 `truncated` 为 true，不能将当前行当作完整来源清单。

## 来源接入方式

本次代码调整使用同一个 Google tag 上报 `page_view` 和 `email_click`，由 GA4 自行维护客户端、会话及来源归因。
初始化保留实际落地 URL（包括 UTM 参数）和 `document.referrer`，不在代码里猜测来源，也不把未知访问强行标记成搜索或社交。

- 仅 `timyooapparel.com`、`www.timyooapparel.com` 加载统计；localhost、局域网预览、Pages 预览域名不加载统计。
- 现有所有 `mailto:` 入口沿用 `email_click`，不需要重新创建事件。
- 不再通过 Zaraz 分流邮箱点击，避免同一次访问与点击归到不同客户端/会话。
- 不要再启用一份向同一 GA4 媒体资源上报的 Zaraz / GTM / gtag，否则可能重复计数。
- 保留 GA4 正常来源归因，不添加访客指纹、IP 识别或额外跨站追踪。
- 新配置需发布后才对正式网站生效，无法补回历史缺失的来源数据。

## 自然来源与可选分享链接

Google/Bing 搜索或其他网站传来有效 referrer 时，GA4 可自动判断来源。
目前没有微信、邮件、LinkedIn 主动分享，重点是搜索和外部网站的自然访问来源，不需要配置 UTM 链接。
以下仅作为将来主动分享时的备用说明：微信、邮件、私信等经常不传 referrer，可使用带 UTM 参数的外部分享链接。

| 使用位置 | 分享链接 |
| --- | --- |
| 微信分享 | https://www.timyooapparel.com/?utm_source=wechat&utm_medium=social&utm_campaign=factory_intro |
| 邮件签名 | https://www.timyooapparel.com/?utm_source=outreach&utm_medium=email&utm_campaign=email_signature |
| LinkedIn 主页 | https://www.timyooapparel.com/?utm_source=linkedin&utm_medium=social&utm_campaign=company_profile |

- `utm_source`：来源平台或渠道名称。
- `utm_medium`：媒介，如 `social`、`email`、`cpc`。
- `utm_campaign`：推广活动/使用场景。
- 可增加 `utm_content` 区分不同素材或按钮，统一使用小写命名。
- 链接要由你放到对应外部平台；网站本身无法自动修改别人分享的链接。
- 不在站内导航加 UTM，不删除分享链接的参数；带锚点时参数放在 `#` 前面。
- 不在 UTM 中放客户姓名、邮箱、手机号等个人信息。
- Direct 仍然可能出现：直接输入地址、书签、未标记的私信、丢失来源的跳转等。UTM 表明链接的标记，不证明点击者的身份或实际使用的平台。
- GA4 只能统计成功收到的事件；广告拦截、网络故障等仍会造成遗漏，不能视为全部真实人数。

以后询问“最近 7 天流量”时，同时列出 `sources` 和 `emailClicksBySource`，不只报国家分布。
国家是地理位置，来源是从哪里点进网站，两者要区分。

## 在 GA4 页面查看

1. 打开 [Google Analytics](https://analytics.google.com/)。
2. 选择账号 `TimYooApparel` 和媒体资源 `TimYooApparel`。
3. 进入“报告”查看用户、会话和事件。
4. 查看邮箱按钮点击：进入“报告” -> “互动” -> “事件”，搜索 `email_click`。
5. 查看国家：在报告中将维度切换为“国家/地区”，指标使用“活跃用户”。
6. 查看来源：进入“报告” -> “获客” -> “流量获取”，选择“会话来源/媒介”；需要区分推广活动时增加“会话广告系列”。报告菜单可能随属性配置不同。

### API 来源查询维度

访问和邮箱点击都使用会话维度，避免把“首次发现网站的来源”误当成本次访问来源：

```json
"dimensions": [
  { "name": "sessionDefaultChannelGroup" },
  { "name": "sessionSourceMedium" },
  { "name": "sessionCampaignName" }
]
```

来源访问指标使用 `totalUsers`、`activeUsers`、`sessions`、`screenPageViews`。
来源邮箱点击指标使用 `eventCount`、`totalUsers`，并按下文的 `eventName = email_click` 过滤。
这些是 GA4 标准维度，不用额外注册自定义维度。

## API 查询口径

### 最近 7 天总体数据

报告请求使用：

```json
{
  "dateRanges": [{ "startDate": "7daysAgo", "endDate": "yesterday" }],
  "metrics": [
    { "name": "activeUsers" },
    { "name": "sessions" },
    { "name": "eventCount" }
  ]
}
```

- `activeUsers`：去重后的活跃用户数；总用户 UV 请使用 `totalUsers`
- `sessions`：会话数
- `eventCount`：所有事件总数

### 按天查看流量

在总体请求中增加：

```json
"dimensions": [{ "name": "date" }]
```

注意：按天的 `activeUsers` 相加不一定等于整个时间段的 UV，因为同一个用户可能在多天访问。整个时间段的 UV 应以不带 `date` 维度的总体查询为准。

### 查看 UV 来自哪些国家

将维度改为：

```json
"dimensions": [{ "name": "country" }]
```

指标使用：

```json
"metrics": [
  { "name": "activeUsers" },
  { "name": "sessions" }
]
```

### 查看发送邮件按钮点击量

邮箱点击事件名称为 `email_click`。请求使用事件名称过滤：

```json
{
  "dateRanges": [{ "startDate": "7daysAgo", "endDate": "yesterday" }],
  "dimensions": [{ "name": "eventName" }],
  "metrics": [{ "name": "eventCount" }],
  "dimensionFilter": {
    "filter": {
      "fieldName": "eventName",
      "stringFilter": {
        "matchType": "EXACT",
        "value": "email_click"
      }
    }
  }
}
```

如果返回没有数据行，表示当前时间范围内没有收到 `email_click`，不是接口报错。也可以先查询所有 `eventName`，确认事件是否已经进入 GA4。

## API 请求地址

```text
POST https://analyticsdata.googleapis.com/v1beta/properties/543672900:runReport
```

请求需要使用服务账号 OAuth 令牌，并带上：

```text
Authorization: Bearer <access_token>
Content-Type: application/json
```

OAuth scope：

```text
https://www.googleapis.com/auth/analytics.readonly
```

## 结果解读

- “最近 7 天”默认使用 `7daysAgo` 到 `yesterday`；含今天使用 `6daysAgo` 到 `today`，不要把 8 个日期误当作 7 天。数据按 GA4 属性时区返回；本项目时区为 `Asia/Shanghai`。
- GA4 数据可能存在处理延迟，刚发生的访问或点击不一定立即出现。
- `(direct) / (none)` 表示 GA4 没有识别到来源，不一定代表用户手动输入 URL，也可能来自书签、未传递来源信息的链接等。
- 邮箱点击量只能统计成功发送到 GA4 的 `email_click` 事件，不能直接代表邮件最终是否发送成功或客户是否回复。

参考：[GA4 来源与 UTM](https://support.google.com/analytics/answer/11242870?hl=zh-CN)、[Google tag 页面浏览](https://developers.google.com/analytics/devguides/collection/ga4/views)、[Data API 批量报表](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)。

## 最近一次查询记录

查询时间：2026-09-27。

- 最近 7 天 UV：5
- 会话数：5
- 总事件数：41
- 国家：美国 3 人，爱尔兰 2 人
- `email_click`：0
