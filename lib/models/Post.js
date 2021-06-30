import pool from '../utils/pool.js';

export default class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert ({ photoUrl, caption, tags, userId }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (photo_url, caption, tags, user_id )
        VALUES ($1, $2, $3, $4)
        RETURNING *`, 
      [photoUrl, caption, tags, userId]
    );

    return new Post(rows[0]);
  }

}
