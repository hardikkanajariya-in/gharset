"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { Product } from "@/types/product";

type AdminImage = {
  fileId: string;
  name: string;
  mimeType?: string;
  createdAt?: string;
};

type ProductEdit = {
  imageDriveIds: string[];
  imageAlt: string;
};

export function AdminImageManager() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<AdminImage[]>([]);
  const [edits, setEdits] = useState<Record<string, ProductEdit>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Could not login.");
      return;
    }

    setAuthenticated(true);
    await loadData();
  }

  async function loadData() {
    setLoading(true);
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Could not load admin data.");
      return;
    }

    setProducts(data.products || []);
    setImages(data.images || []);
    setEdits(
      Object.fromEntries(
        (data.products || []).map((product: Product) => [
          product.productId,
          {
            imageDriveIds: [product.imageDriveIds[0] || "", product.imageDriveIds[1] || "", product.imageDriveIds[2] || ""],
            imageAlt: product.imageAlt || product.name
          }
        ])
      )
    );
  }

  function setImage(productId: string, index: number, value: string) {
    setEdits((current) => {
      const edit = current[productId] || { imageDriveIds: ["", "", ""], imageAlt: "" };
      const nextImages = [...edit.imageDriveIds];
      nextImages[index] = value;
      return { ...current, [productId]: { ...edit, imageDriveIds: nextImages } };
    });
  }

  function setAlt(productId: string, value: string) {
    setEdits((current) => {
      const edit = current[productId] || { imageDriveIds: ["", "", ""], imageAlt: "" };
      return { ...current, [productId]: { ...edit, imageAlt: value } };
    });
  }

  async function saveProduct(productId: string) {
    setMessage("");
    const edit = edits[productId];
    const response = await fetch("/api/admin/products/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        imageDriveIds: edit?.imageDriveIds || [],
        imageAlt: edit?.imageAlt || ""
      })
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Could not update product.");
      return;
    }

    setMessage(`Updated ${productId}.`);
  }

  function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setMessage("");
    setUploadProgress(1);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/images");
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.max(1, Math.round((event.loaded / event.total) * 100)));
      }
    };
    request.onload = async () => {
      setUploadProgress(0);
      if (request.status >= 200 && request.status < 300) {
        setMessage("Images uploaded.");
        await loadData();
        return;
      }

      try {
        const data = JSON.parse(request.responseText);
        setMessage(data.error || "Upload failed.");
      } catch {
        setMessage("Upload failed.");
      }
    };
    request.onerror = () => {
      setUploadProgress(0);
      setMessage("Upload failed.");
    };
    request.send(formData);
  }

  if (!authenticated) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md page-panel grid gap-3 p-4">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Username
          <input value={username} onChange={(event) => setUsername(event.target.value)} className="control-input" />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="control-input" />
        </label>
        <button className="focus-ring h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-crisp">
          {loading ? "Checking..." : "Login"}
        </button>
        {message ? <p className="text-sm font-medium text-dangerText">{message}</p> : null}
      </form>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="page-panel p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Image library</p>
            <p className="mt-1 text-sm font-medium text-muted">
              Upload multiple images once, then assign them to products below.
            </p>
          </div>
          <label className="focus-within:ring-secondary focus-within:ring-2 inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-crisp">
            Upload images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => uploadFiles(event.target.files)}
              className="sr-only"
            />
          </label>
        </div>
        {uploadProgress ? (
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-mutedSurface">
            <div className="h-full bg-secondary transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        ) : null}
        {message ? <p className="mt-3 text-sm font-medium text-mutedStrong">{message}</p> : null}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
        <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
          <thead className="bg-primaryDark text-white">
            <tr>
              <Th>Product</Th>
              <Th>Thumbnail</Th>
              <Th>Gallery 2</Th>
              <Th>Gallery 3</Th>
              <Th>Alt text</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const edit = edits[product.productId] || { imageDriveIds: ["", "", ""], imageAlt: product.imageAlt };

              return (
                <tr key={product.productId} className="border-t border-line align-top">
                  <td className="p-3">
                    <p className="font-semibold text-ink">{product.name}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{product.productId}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{product.category}</p>
                  </td>
                  {[0, 1, 2].map((index) => (
                    <td key={index} className="p-3">
                      <ImageSelect
                        images={images}
                        value={edit.imageDriveIds[index] || ""}
                        onChange={(value) => setImage(product.productId, index, value)}
                      />
                    </td>
                  ))}
                  <td className="p-3">
                    <input
                      value={edit.imageAlt}
                      onChange={(event) => setAlt(product.productId, event.target.value)}
                      className="control-input w-64"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => saveProduct(product.productId)}
                      className="focus-ring h-10 rounded-xl bg-primary px-4 text-xs font-semibold text-white shadow-crisp"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ImageSelect({
  images,
  value,
  onChange
}: {
  images: AdminImage[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="control-input w-56">
        <option value="">No image</option>
        {images.map((image) => (
          <option key={image.fileId} value={image.fileId}>
            {image.name}
          </option>
        ))}
      </select>
      {value ? (
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-line bg-mutedSurface">
          <img src={`/api/drive-image/${value}`} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return <th className="p-3 text-xs font-semibold uppercase tracking-[0.12em]">{children}</th>;
}
