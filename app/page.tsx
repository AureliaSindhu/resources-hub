"use client";
import { useState, useEffect } from "react";

interface Resource {
  title: string;
  link: string;
  description: string;
  category: string;
}

const categories = [
  "All",
  "Design",
  "Development",
  "Productivity",
  "Inspiration",
];

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState<Resource>({
    title: "",
    link: "",
    description: "",
    category: "Design",
  });

  // Load resources from localStorage on initial render
  useEffect(() => {
    const savedResources = localStorage.getItem("resources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, []);

  // Save resources to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const filteredResources =
    filter === "All"
      ? resources
      : resources.filter((r) => r.category === filter);

  function handleInput(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddResource(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.link) return;
    setResources([form, ...resources]);
    setForm({ title: "", link: "", description: "", category: "Design" });
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
          <p className="text-neutral-400 text-center">
            Dumping all the links I've found. 
          </p>
        </header>
        <form
          onSubmit={handleAddResource}
          className="bg-neutral-900 rounded-xl p-6 mb-8 shadow-lg flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleInput}
              required
            />
            <input
              className="flex-1 bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              name="link"
              placeholder="Link (https://...)"
              value={form.link}
              onChange={handleInput}
              required
            />
          </div>
          <textarea
            className="bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleInput}
            rows={2}
          />
          <div className="flex items-center gap-4">
            <select
              className="bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              name="category"
              value={form.category}
              onChange={handleInput}
            >
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Add Resource
            </button>
          </div>
        </form>
        <nav className="flex gap-2 mb-6 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full text-sm font-medium transition border border-transparent ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        <section className="grid gap-6 sm:grid-cols-2">
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center text-neutral-500 py-12">
              No resources yet. Add your first one!
            </div>
          ) : (
            filteredResources.map((res, i) => (
              <a
                key={i}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-neutral-900 rounded-xl p-5 shadow hover:shadow-xl border border-neutral-800 hover:border-indigo-600 transition group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-700/20 text-indigo-300 font-semibold">
                    {res.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold group-hover:text-indigo-400 transition line-clamp-1">
                  {res.title}
                </h2>
                <p className="text-neutral-400 text-sm mt-1 line-clamp-2">
                  {res.description}
                </p>
                <span className="block mt-2 text-xs text-indigo-500 group-hover:underline break-all">
                  {res.link}
                </span>
              </a>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
