try {
    const res = await fetch("https://ep-round-cherry-adriafdu-pooler.c-2.us-east-1.aws.neon.tech");
    console.log(res.status);
    console.log(await res.text());
}
catch (e) {
    console.dir(e, { depth: null });
}
export {};
