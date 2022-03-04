export async function get() {
    const imports = import.meta.glob("./*.{md,svx}");
    let body = [];

    for (const path in imports) {
        body.push(
            imports[path]().then(({ metadata }) => {
                return {
                    metadata,
                    path,
                };
            })
        );
    }

    const posts = await Promise.all(body);

    // console.log(posts)

    return {
        body: JSON.stringify(posts)
    }
}