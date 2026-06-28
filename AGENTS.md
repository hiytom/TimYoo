# Project Execution Notes

每次在这个项目里执行代码修改、检查、构建或发布相关工作之前，先阅读本文件。

## Versioning

当前项目版本为 `1.5`。

版本号采用两段式：`major.minor`。

- 只有在准备 push / 发布时才递增版本号；普通本地修改、修 bug、调样式时不要递增。
- 小更新发布：在小版本上增加 `0.1`，例如 `1.0` -> `1.1` -> `1.2`。
- 大版本发布：在大版本上增加 `1.0`，例如 `1.0` -> `2.0` -> `3.0`。
- push / 发布前修改版本号时，同步更新：
  - `package.json`
  - `package-lock.json`
  - `src/data/siteData.ts` 中展示用的 `footer.version`

## Before Work

- 先检查当前 git 状态，确认是否有用户未提交的改动。
- 不要回退或覆盖用户已有改动，除非用户明确要求。
- 改完后至少运行一次 `npm run build` 验证。
