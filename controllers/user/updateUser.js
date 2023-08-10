const db = require("../../db");

const updateUser = async (req, res) => {
  try {
    const { id, username, email, firstName, lastName, state, role } = req.body;

    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const updateUserQuery = `
        UPDATE users
        SET username = $1, email = $2, role = $3
        WHERE id = $4
        RETURNING *
      `;
      const updateUserValues = [username, email, role, id];
      const { rows: updatedUserRows } = await client.query(
        updateUserQuery,
        updateUserValues
      );

      const updateProfileQuery = `
        UPDATE profiles
        SET firstName = $1, lastName = $2, state = $3
        WHERE id = $4
        RETURNING *
      `;
      const updateProfileValues = [
        firstName,
        lastName,
        state,
        updatedUserRows[0].profile_id,
      ];
      const { rows: updatedProfileRows } = await client.query(
        updateProfileQuery,
        updateProfileValues
      );

      await client.query("COMMIT");

      const updatedData = {
        user: updatedUserRows[0],
        profile: updatedProfileRows[0],
      };

      res.json(updatedData);
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

module.exports = updateUser;
