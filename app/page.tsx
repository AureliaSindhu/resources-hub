"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Pencil, Plus, Trash2, X } from "lucide-react";

import icon from "./icon.png";

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
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Resource>({
    title: "",
    link: "",
    description: "",
    category: "Design",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedResources = localStorage.getItem("resources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const filteredResources = useMemo(() => {
    return filter === "All"
      ? resources
      : resources.filter((r) => r.category === filter);
  }, [resources, filter]);

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

    if (editIndex !== null) {
      const updatedResources = resources.map((res, index) =>
        index === editIndex ? form : res
      );
      setResources(updatedResources);
      setEditIndex(null);
    } else {
      setResources([form, ...resources]);
    }
    setForm({ title: "", link: "", description: "", category: "Design" });
  }

  function handleEdit(resourceToEdit: Resource) {
    const index = resources.findIndex(
      (r) =>
        r.title === resourceToEdit.title &&
        r.link === resourceToEdit.link &&
        r.description === resourceToEdit.description &&
        r.category === resourceToEdit.category
    );
    if (index !== -1) {
      setForm(resourceToEdit);
      setEditIndex(index);
    } else {
      const fallbackIndex = resources.indexOf(resourceToEdit);
      if (fallbackIndex !== -1) {
        setForm(resourceToEdit);
        setEditIndex(fallbackIndex);
      }
    }
  }

  function handleDelete(index: number) {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-neutral-100 px-4 py-6 font-sans">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-8 flex flex-col gap-2 items-center">
          <div className="flex flex-row items-center">
            <Image
              src={icon}
              alt="Resource Hub Icon"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
          </div>
          <p className="text-neutral-400 text-center">
            Dumping all the links I&apos;ve found.
          </p>
        </header>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddResource}
            className="bg-neutral-900 rounded-xl p-6 mb-8 shadow-lg flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-100 placeholder-neutral-500"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleInput}
                required
              />
              <input
                className="flex-1 bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-100 placeholder-neutral-500"
                name="link"
                type="url"
                placeholder="Link (https://...)"
                value={form.link}
                onChange={handleInput}
                required
              />
            </div>
            <textarea
              className="bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-100 placeholder-neutral-500"
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={handleInput}
              rows={2}
            />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-1/4">
                <select
                  className="appearance-none w-full bg-neutral-800 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 pr-10 text-neutral-100"
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <ChevronDown size={20} />
                </span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto sm:ml-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              >
                {editIndex !== null ? "Update Resource" : "Add Resource"}
              </button>
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditIndex(null);
                    setForm({
                      title: "",
                      link: "",
                      description: "",
                      category: "Design",
                    });
                  }}
                  className="w-full sm:w-auto text-xs text-neutral-400 hover:underline sm:ml-2 order-first sm:order-last"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        )}

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

        <section className="grid gap-6 sm:grid-cols-2 overflow-y-auto h-[calc(100vh-16rem)]">
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center text-neutral-500 py-12">
              No resources yet. Add your first one!
            </div>
          ) : (
            filteredResources.map((res) => (
              <a
                key={res.link + res.title}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-900 rounded-xl p-5 shadow hover:shadow-xl border border-neutral-800 hover:border-indigo-600 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-row items-start mb-2 w-full">
                    <h2 className="text-md font-bold group-hover:text-indigo-400 transition line-clamp-1 mr-2 flex-1">
                      {res.title}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit(res);
                        }}
                        className="text-indigo-500 hover:text-indigo-400 transition flex-shrink-0"
                        aria-label={`Edit ${res.title}`}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const originalIndex = resources.findIndex(
                            (r) =>
                              r.title === res.title &&
                              r.link === res.link &&
                              r.description === res.description &&
                              r.category === res.category
                          );
                          handleDelete(originalIndex);
                        }}
                        className="text-red-500 hover:text-red-400 transition flex-shrink-0"
                        aria-label={`Delete ${res.title}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-700/20 text-indigo-300 font-semibold">
                      {res.category}
                    </span>
                  </div>
                  {res.description && (
                    <p className="text-neutral-400 text-sm mt-1 line-clamp-2">
                      {res.description}
                    </p>
                  )}
                </div>
                <span className="block mt-2 text-xs text-indigo-500 group-hover:underline break-all">
                  {res.link}
                </span>
              </a>
            ))
          )}
        </section>
      </div>

      <footer className="mx-auto py-2 text-center text-sm text-neutral-500 mt-8">
        <p>
          &copy; {new Date().getFullYear()} made with several cups of americano,
          love by{" "}
          <a
            href="https://www.instagram.com/aacodee/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline text-indigo-400"
          >
            aacode
          </a>
        </p>
      </footer>
    </div>
  );
}
