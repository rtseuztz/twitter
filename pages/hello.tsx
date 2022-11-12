

export default async function Hello() {
    const res = await fetch("hello");
    console.log(res);
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}