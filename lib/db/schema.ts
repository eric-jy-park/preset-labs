import { pgTable, text, integer, timestamp, uuid, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// Users table - Clerk OAuth data
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  image: text("image"), // Profile photo
  kakaoId: text("kakao_id").unique(),
  hasSeenWelcome: boolean("has_seen_welcome").default(false).notNull(),
  hasGivenFeedback: boolean("has_given_feedback").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

// Photos table - User uploads
export const photos = pgTable("photos", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalUrl: text("original_url").notNull(), // Vercel Blob URL
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(), // bytes
  mimeType: text("mime_type").notNull(), // image/jpeg, image/png, etc.
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"), // soft delete
})

// Saved edits table - Filter + photo combinations
export const savedEdits = pgTable("saved_edits", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  photoId: uuid("photo_id")
    .notNull()
    .references(() => photos.id, { onDelete: "cascade" }),
  presetId: text("preset_id").notNull(), // references preset name
  editedUrl: text("edited_url"), // nullable, for processed images
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
})

// User credits table - For future monetization
export const userCredits = pgTable("user_credits", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  credits: integer("credits").default(10).notNull(), // free trial credits
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
})

// Gallery table - Downloaded photos (credit spent)
export const gallery = pgTable("gallery", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalUrl: text("original_url").notNull(), // Original photo URL
  fileName: text("file_name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  presetId: text("preset_id").notNull(), // Filter preset used
  presetName: text("preset_name").notNull(), // Display name
  filterIntensity: integer("filter_intensity").notNull(), // 0-100
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
})

// Type exports for use in application
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Photo = typeof photos.$inferSelect
export type NewPhoto = typeof photos.$inferInsert

export type SavedEdit = typeof savedEdits.$inferSelect
export type NewSavedEdit = typeof savedEdits.$inferInsert

export type UserCredits = typeof userCredits.$inferSelect
export type NewUserCredits = typeof userCredits.$inferInsert

export type Gallery = typeof gallery.$inferSelect
export type NewGallery = typeof gallery.$inferInsert
