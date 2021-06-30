import pool from '../utils/pool.js';

export default class Post {
  id;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert ({ photoUrl, caption, tags }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (photo_url, caption, tags)
        VALUES ($1, $2, $3)
        RETURNING *`, 
      [photoUrl, caption, tags]
    );

    return new Post(rows[0]);
  }
}
