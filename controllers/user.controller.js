const db = require("../db");

class UserController {
  async createUser(req, res) {
    try {
      const { username, firstName, lastName, email, role, state } = req.body;

      const profileQuery =
        "INSERT INTO profiles (firstName, lastName, state) VALUES ($1, $2, $3) RETURNING id";
      const profileValues = [firstName, lastName, state];
      const { rows: profileRows } = await db.query(profileQuery, profileValues);

      const profileId = profileRows[0].id;

      const userQuery =
        "INSERT INTO users (username, email, role, dateCreate, profile_id) VALUES ($1, $2, $3, NOW(), $4) RETURNING id";
      const userValues = [username, email, role, profileId];
      const { rows: userRows } = await db.query(userQuery, userValues);

      const getUserQuery = `
      SELECT users.*, profiles.* 
      FROM users 
      INNER JOIN profiles ON users.profile_id = profiles.id
      WHERE users.id = $1
    `;
      const getUserValues = [userRows[0].id];
      const { rows: fullUserRows } = await db.query(
        getUserQuery,
        getUserValues
      );

      res.json(fullUserRows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getUsers(req, res) {}
  async getUserByRole(req, res) {}
  async updateUser(req, res) {}
  async deleteUser(req, res) {}
}

module.exports = new UserController();
