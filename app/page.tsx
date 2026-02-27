async function getDemo() {
  const res = await fetch("https://api.lab.sviuh.net/demo", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const demo = await getDemo();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">SVIUH Startup Lab</h1>

      <p className="mt-4">{demo.message}</p>

      <pre className="mt-6 bg-gray-100 p-4 rounded">
        {JSON.stringify(demo, null, 2)}
      </pre>
    </main>
  );
}