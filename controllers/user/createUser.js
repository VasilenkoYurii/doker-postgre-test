const db = require("../../db");

const createUser = async (req, res) => {
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
      SELECT users.id as user_id, users.username, users.email, users.role, users.datecreate,
             profiles.id as profile_id, profiles.firstname, profiles.lastname, profiles.state
      FROM users 
      INNER JOIN profiles ON users.profile_id = profiles.id
      WHERE users.id = $1
    `;
    const getUserValues = [userRows[0].id];
    const { rows: fullUserRows } = await db.query(getUserQuery, getUserValues);

    const formattedUser = {
      id: fullUserRows[0].user_id,
      username: fullUserRows[0].username,
      email: fullUserRows[0].email,
      role: fullUserRows[0].role,
      datecreate: fullUserRows[0].datecreate,
      profile: {
        id: fullUserRows[0].profile_id,
        firstname: fullUserRows[0].firstname,
        lastname: fullUserRows[0].lastname,
        state: fullUserRows[0].state,
      },
    };

    res.json(formattedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createUser;
