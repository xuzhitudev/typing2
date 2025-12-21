import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const tDemo = pgTable("t_demo", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// 课程表
export const course = pgTable("course", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text().notNull(),
  description: text().notNull(),
  image: text("image"),
  creator: text().notNull(),
  duration: integer().default(0), // 学习时长，单位是秒
  latest: timestamp(), // 最新学习时间
  chapterTotal: integer("chapter_total").default(0), // 章节总数
  chapterIndex: integer("chapter_index").default(0), // 当前章节
  isShared: boolean("is_shared").default(false),
  subscriberIds: text("subscriber_ids")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`), // 订阅者ID
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// 章节表
export const chapter = pgTable("chapter", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text().notNull(),
  description: text().notNull(),
  creator: text().notNull(),
  duration: integer().default(0), // 章节学习时长（秒）
  latest: timestamp(), // 最新学习时间
  sentenceTotal: integer("sentence_total").default(0), // 句子总数
  sentenceIndex: integer("sentence_index").default(0), // 当前进度
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  courseId: text("course_id"),
});

// 句子表
export const sentence = pgTable("sentence", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cn: text().notNull(),
  en: text().notNull(),
  description: text(), // 英文解释
  audio: text(), // 音频地址
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at"),
  chapterId: text("chapter_id"),
});

// 短语或单词表
export const phrase = pgTable("phrase", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cn: text().notNull(),
  en: text().notNull(),
  phonetic: text(), // 音标
  speech: text(), // 词性
  audio: text(), // 音频地址
  basicDefinition: text("basic_definition"), // 基本含义
  contextualMeaning: text("contextual_meaning"), // 上下文含义
  synonyms: text("synonyms").array().notNull().default(sql`'{}'::text[]`), // 同义词
  antonyms: text("antonyms").array().notNull().default(sql`'{}'::text[]`), // 反义词
  commonPhrases: text("common_phrases")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`), // 常用短语
  exampleSentences: text("example_sentences"), // 例句
  mnemonics: text("mnemonics"), // 记忆技巧
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at"),
  sentenceId: text("sentence_id"),
});
