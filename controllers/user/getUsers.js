const db = require("../../db");

const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    let getUsersQuery = `
  SELECT users.id as user_id, users.username, users.email, users.role, users.datecreate,
         profiles.id as profile_id, profiles.firstname, profiles.lastname, profiles.state
  FROM users 
  INNER JOIN profiles ON users.profile_id = profiles.id
`;

    if (role) {
      getUsersQuery += "WHERE users.role = $1";
    }

    const queryValues = role ? [role] : [];

    const { rows: usersWithProfiles } = await db.query(
      getUsersQuery,
      queryValues
    );

    const formattedUsers = usersWithProfiles.map((row) => ({
      id: row.user_id,
      username: row.username,
      email: row.email,
      role: row.role,
      datecreate: row.datecreate,
      profile: {
        id: row.profile_id,
        firstname: row.firstname,
        lastname: row.lastname,
        state: row.state,
      },
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getUsers;
