/* Seed ChatterBox with demo users and a believable message history. */
import bcrypt from "bcryptjs";
import prisma from "./db/prisma.js";

const PASSWORD = "demo1234";

const USERS = [
  { fullName: "Demo User", username: "demo", gender: "male" },
  { fullName: "Aarav Sharma", username: "aarav", gender: "male" },
  { fullName: "Priya Nair", username: "priya", gender: "female" },
  { fullName: "Rohan Mehta", username: "rohan", gender: "male" },
  { fullName: "Sara Khan", username: "sara", gender: "female" },
  { fullName: "Vikram Rao", username: "vikram", gender: "male" },
];

// Conversations keyed by the other participant's username.
// dir: "in" = they sent to demo, "out" = demo sent to them.
const CONVERSATIONS = {
  aarav: [
    ["in", "Hey! Are we still on for the project sync today?"],
    ["out", "Yes! 4pm works for me. Did you push the latest changes?"],
    ["in", "Just did. The socket reconnection bug is fixed 🎉"],
    ["out", "Amazing, that one was driving me crazy 😅"],
    ["in", "Haha same. I'll walk you through it on the call"],
    ["out", "Perfect, talk soon 👍"],
  ],
  priya: [
    ["in", "Did you see the new design mockups?"],
    ["out", "Yes! The gradient header looks so clean"],
    ["in", "Right? I wanted it to feel modern but not overdone"],
    ["out", "You nailed it. Shipping it today?"],
    ["in", "Planning to, just polishing the mobile view"],
    ["out", "Let me know if you need a review 🙌"],
  ],
  rohan: [
    ["out", "Bro are you coming to the meetup on Saturday?"],
    ["in", "Thinking about it! Who else is going?"],
    ["out", "Sara and Vikram confirmed already"],
    ["in", "Okay count me in then 🔥"],
    ["out", "Great, it's going to be fun"],
  ],
  sara: [
    ["in", "Can you review my PR when you get a sec?"],
    ["out", "Sure, sending comments in a bit"],
    ["in", "Thank you so much 🙏"],
    ["out", "Left a few notes — mostly small stuff, looks solid overall"],
    ["in", "Awesome, will fix and merge"],
  ],
  vikram: [
    ["out", "Lunch? 🍜"],
    ["in", "Give me 15 mins, finishing a deploy"],
    ["out", "No rush, I'll grab a table"],
    ["in", "You're the best 😄"],
  ],
};

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(PASSWORD, salt);

  // Reset demo data (cascades to messages)
  await prisma.message.deleteMany({});
  await prisma.user.deleteMany({});

  // Distinct background per user for visual variety (brand-family palette).
  const bgColors = ["7c6cf5", "22d3ee", "c084fc", "34d399", "fbbf24", "fb7185"];
  const byUsername = {};
  USERS.forEach((u, i) => (u._bg = bgColors[i % bgColors.length]));
  for (const u of USERS) {
    const pic = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      u.fullName
    )}&background=${u._bg}&color=fff&bold=true`;
    const created = await prisma.user.create({
      data: {
        fullName: u.fullName,
        username: u.username,
        gender: u.gender,
        password: hash,
        profilePic: pic,
      },
    });
    byUsername[u.username] = created;
  }

  const demo = byUsername.demo;

  // Build messages with increasing timestamps so ordering is stable.
  // (Date.now/new Date are fine here — this is a one-off script, not a workflow.)
  let clock = Date.now() - 1000 * 60 * 60 * 6; // start 6 hours ago
  const rows = [];
  for (const [username, msgs] of Object.entries(CONVERSATIONS)) {
    const other = byUsername[username];
    for (const [dir, text] of msgs) {
      clock += 1000 * 60 * (2 + Math.floor((rows.length % 5))); // few-minute gaps
      rows.push({
        senderId: dir === "out" ? demo.id : other.id,
        receiverId: dir === "out" ? other.id : demo.id,
        message: text,
        createdAt: new Date(clock),
      });
    }
  }
  await prisma.message.createMany({ data: rows });

  console.log(
    `Seeded ${USERS.length} users and ${rows.length} messages. Demo login: demo / ${PASSWORD}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
