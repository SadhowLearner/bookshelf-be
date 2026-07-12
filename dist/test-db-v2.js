import "dotenv/config";
const res = await fetch("https://api.c-2.us-east-1.aws.neon.tech/sql", {
    method: "POST",
    headers: {
        "Neon-Connection-String": process.env.DATABASE_URL,
        "Neon-Raw-Text-Output": "true",
        "Neon-Array-Mode": "true",
    },
    body: JSON.stringify({
        query: "SELECT NOW()",
        params: [],
    }),
});
console.log(res.status);
console.log(await res.text());
