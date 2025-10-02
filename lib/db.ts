import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database query helpers
export async function getLatestEpisodes(limit = 12) {
  const result = await sql`
    SELECT 
      e.id,
      e.episode_number,
      e.title as episode_title,
      e.vk_video_url,
      e.thumbnail_url,
      e.release_date,
      r.id as release_id,
      r.title,
      r.title_ru,
      r.cover_image_url
    FROM episodes e
    JOIN releases r ON e.release_id = r.id
    ORDER BY e.created_at DESC
    LIMIT ${limit}
  `
  return result
}

export async function getTodayReleases() {
  const result = await sql`
    SELECT 
      e.id,
      e.episode_number,
      e.title as episode_title,
      e.vk_video_url,
      e.thumbnail_url,
      r.id as release_id,
      r.title,
      r.title_ru,
      r.cover_image_url,
      r.description
    FROM episodes e
    JOIN releases r ON e.release_id = r.id
    WHERE e.release_date = CURRENT_DATE
    ORDER BY e.created_at DESC
  `
  return result
}

export async function getReleaseById(id: number) {
  const releases = await sql`
    SELECT * FROM releases WHERE id = ${id}
  `
  return releases[0] || null
}

export async function getEpisodesByReleaseId(releaseId: number) {
  const result = await sql`
    SELECT * FROM episodes 
    WHERE release_id = ${releaseId}
    ORDER BY episode_number ASC
  `
  return result
}

export async function getUserByEmail(email: string) {
  const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  return users[0] || null
}

export async function getUserById(id: number) {
  const users = await sql`
    SELECT id, email, username, avatar_url, created_at 
    FROM users WHERE id = ${id}
  `
  return users[0] || null
}

export async function createUser(email: string, passwordHash: string, username: string) {
  const result = await sql`
    INSERT INTO users (email, password_hash, username)
    VALUES (${email}, ${passwordHash}, ${username})
    RETURNING id, email, username, avatar_url, created_at
  `
  return result[0]
}

export async function getUserListStatus(userId: number, releaseId: number) {
  const result = await sql`
    SELECT status FROM user_lists
    WHERE user_id = ${userId} AND release_id = ${releaseId}
  `
  return result[0]?.status || null
}

export async function addToList(userId: number, releaseId: number, status: string) {
  const result = await sql`
    INSERT INTO user_lists (user_id, release_id, status)
    VALUES (${userId}, ${releaseId}, ${status})
    ON CONFLICT (user_id, release_id) 
    DO UPDATE SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `
  return result[0]
}

export async function removeFromList(userId: number, releaseId: number) {
  await sql`
    DELETE FROM user_lists
    WHERE user_id = ${userId} AND release_id = ${releaseId}
  `
}

export async function getUserListsByStatus(userId: number, status?: string) {
  if (status) {
    const result = await sql`
      SELECT r.*, ul.status, ul.created_at as added_at, ul.updated_at
      FROM releases r
      JOIN user_lists ul ON r.id = ul.release_id
      WHERE ul.user_id = ${userId} AND ul.status = ${status}
      ORDER BY ul.updated_at DESC
    `
    return result
  } else {
    const result = await sql`
      SELECT r.*, ul.status, ul.created_at as added_at, ul.updated_at
      FROM releases r
      JOIN user_lists ul ON r.id = ul.release_id
      WHERE ul.user_id = ${userId}
      ORDER BY ul.updated_at DESC
    `
    return result
  }
}

export async function getUserListsCount(userId: number) {
  const result = await sql`
    SELECT 
      status,
      COUNT(*) as count
    FROM user_lists
    WHERE user_id = ${userId}
    GROUP BY status
  `
  return result
}

export async function getAllReleases() {
  const result = await sql`
    SELECT * FROM releases ORDER BY created_at DESC
  `
  return result
}

export async function createRelease(data: {
  title: string
  title_ru: string
  description: string
  cover_image_url: string
  year: number
  season: string
  total_episodes: number
  status: string
  genres: string[]
  rating: string
}) {
  const result = await sql`
    INSERT INTO releases (
      title, title_ru, description, cover_image_url, 
      year, season, total_episodes, status, genres, rating
    )
    VALUES (
      ${data.title}, ${data.title_ru}, ${data.description}, 
      ${data.cover_image_url}, ${data.year}, ${data.season}, 
      ${data.total_episodes}, ${data.status}, ${data.genres}, ${data.rating}
    )
    RETURNING *
  `
  return result[0]
}

export async function createEpisode(data: {
  release_id: number
  episode_number: number
  title: string
  vk_video_url: string
  thumbnail_url?: string
  duration?: number
  release_date: string
}) {
  const result = await sql`
    INSERT INTO episodes (
      release_id, episode_number, title, vk_video_url, 
      thumbnail_url, duration, release_date
    )
    VALUES (
      ${data.release_id}, ${data.episode_number}, ${data.title}, 
      ${data.vk_video_url}, ${data.thumbnail_url || null}, 
      ${data.duration || null}, ${data.release_date}
    )
    RETURNING *
  `
  return result[0]
}

export async function updateUserAvatar(userId: number, avatarUrl: string) {
  const result = await sql`
    UPDATE users 
    SET avatar_url = ${avatarUrl}
    WHERE id = ${userId}
    RETURNING id, email, username, avatar_url, created_at
  `
  return result[0]
}

export async function updateUserProfile(userId: number, username: string) {
  const result = await sql`
    UPDATE users 
    SET username = ${username}
    WHERE id = ${userId}
    RETURNING id, email, username, avatar_url, created_at
  `
  return result[0]
}

export async function updateRelease(
  id: number,
  data: {
    title: string
    title_ru: string
    description: string
    cover_image_url: string
    year: number
    season: string
    total_episodes: number
    status: string
    genres: string[]
    rating: string
    featured?: boolean
    featured_order?: number
  },
) {
  const result = await sql`
    UPDATE releases SET
      title = ${data.title},
      title_ru = ${data.title_ru},
      description = ${data.description},
      cover_image_url = ${data.cover_image_url},
      year = ${data.year},
      season = ${data.season},
      total_episodes = ${data.total_episodes},
      status = ${data.status},
      genres = ${data.genres},
      rating = ${data.rating},
      featured = ${data.featured ?? false},
      featured_order = ${data.featured_order ?? 0}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteRelease(id: number) {
  // Delete episodes first (foreign key constraint)
  await sql`DELETE FROM episodes WHERE release_id = ${id}`
  await sql`DELETE FROM user_favorites WHERE release_id = ${id}`
  await sql`DELETE FROM watch_history WHERE release_id = ${id}`

  const result = await sql`
    DELETE FROM releases WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function updateEpisode(
  id: number,
  data: {
    episode_number: number
    title: string
    vk_video_url: string
    thumbnail_url?: string
    duration?: number
    release_date: string
  },
) {
  const result = await sql`
    UPDATE episodes SET
      episode_number = ${data.episode_number},
      title = ${data.title},
      vk_video_url = ${data.vk_video_url},
      thumbnail_url = ${data.thumbnail_url || null},
      duration = ${data.duration || null},
      release_date = ${data.release_date}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteEpisode(id: number) {
  await sql`DELETE FROM watch_history WHERE episode_id = ${id}`

  const result = await sql`
    DELETE FROM episodes WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function getFeaturedReleases() {
  const result = await sql`
    SELECT * FROM releases 
    WHERE featured = true
    ORDER BY featured_order ASC, created_at DESC
    LIMIT 10
  `
  return result
}

export async function searchReleases(query: string) {
  const result = await sql`
    SELECT * FROM releases 
    WHERE 
      title_ru ILIKE ${"%" + query + "%"} OR
      title ILIKE ${"%" + query + "%"} OR
      description ILIKE ${"%" + query + "%"}
    ORDER BY created_at DESC
  `
  return result
}

export async function getReleasesByGenre(genre: string) {
  const result = await sql`
    SELECT * FROM releases 
    WHERE ${genre} = ANY(genres)
    ORDER BY created_at DESC
  `
  return result
}

export async function isFavorite(userId: number, releaseId: number) {
  const result = await sql`
    SELECT COUNT(*) as count FROM user_lists
    WHERE user_id = ${userId} AND release_id = ${releaseId}
  `
  return result[0].count > 0
}

export async function getReleasesByWeekday() {
  const result = await sql`
    SELECT * FROM releases 
    WHERE release_day IS NOT NULL AND status = 'ongoing'
    ORDER BY release_day ASC, title_ru ASC
  `
  return result
}

export async function getContinueWatching(userId: number, limit = 12) {
  const result = await sql`
    SELECT DISTINCT ON (r.id)
      e.id,
      e.episode_number,
      e.title as episode_title,
      e.vk_video_url,
      e.thumbnail_url,
      e.duration,
      r.id as release_id,
      r.title,
      r.title_ru,
      r.cover_image_url,
      r.total_episodes,
      uwh.progress,
      uwh.watched_at
    FROM user_watch_history uwh
    JOIN episodes e ON uwh.episode_id = e.id
    JOIN releases r ON e.release_id = r.id
    WHERE uwh.user_id = ${userId}
      AND uwh.progress < 95
    ORDER BY r.id, uwh.watched_at DESC
    LIMIT ${limit}
  `
  return result
}

export async function updateWatchProgress(userId: number, episodeId: number, progress: number) {
  const result = await sql`
    INSERT INTO user_watch_history (user_id, episode_id, progress, watched_at)
    VALUES (${userId}, ${episodeId}, ${progress}, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, episode_id) 
    DO UPDATE SET 
      progress = ${progress},
      watched_at = CURRENT_TIMESTAMP
    RETURNING *
  `
  return result[0]
}

export async function getWatchProgress(userId: number, episodeId: number) {
  const result = await sql`
    SELECT progress FROM user_watch_history
    WHERE user_id = ${userId} AND episode_id = ${episodeId}
  `
  return result[0]?.progress || 0
}

export async function addToFavorites(userId: number, releaseId: number) {
  const result = await sql`
    INSERT INTO user_favorites (user_id, release_id, created_at)
    VALUES (${userId}, ${releaseId}, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, release_id) DO NOTHING
    RETURNING *
  `
  return result[0]
}

export async function removeFromFavorites(userId: number, releaseId: number) {
  await sql`
    DELETE FROM user_favorites
    WHERE user_id = ${userId} AND release_id = ${releaseId}
  `
}

export async function getUserFavorites(userId: number) {
  const result = await sql`
    SELECT r.*, uf.created_at as favorited_at
    FROM releases r
    JOIN user_favorites uf ON r.id = uf.release_id
    WHERE uf.user_id = ${userId}
    ORDER BY uf.created_at DESC
  `
  return result
}
