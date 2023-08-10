const db = require("../../db");

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const checkUserQuery = `
      SELECT id
      FROM users
      WHERE id = $1
    `;
    const { rows: existingUserRows } = await db.query(checkUserQuery, [userId]);

    if (existingUserRows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const deleteUserAndProfileQuery = `
        DELETE FROM users
        WHERE id = $1
        RETURNING profile_id
      `;
      const { rows } = await client.query(deleteUserAndProfileQuery, [userId]);
      const profileId = rows[0].profile_id;

      const deleteProfileQuery = `
        DELETE FROM profiles
        WHERE id = $1
      `;
      await client.query(deleteProfileQuery, [profileId]);

      await client.query("COMMIT");

      res.json({ message: "User and profile deleted successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteUser;
