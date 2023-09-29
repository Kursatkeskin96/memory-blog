import db from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await db.connect();

    const users = await User.find({}).populate("username");

    // Close the database connection after the operation is complete.
    await db.disconnect();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
