"use client";

import { useState } from "react";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";

const areas = ["Kitchen", "Bathroom", "Fridge", "Wardrobe", "Rented room"];
const budgets = ["Under ₹300", "Under ₹500", "Under ₹1000", "Suggest best option"];

export function SuggestionForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "Kitchen", budget: "Under ₹500", message: "" });
  const [status, setStatus] = useState("");

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Saving...");
    try {
      await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setStatus("Saved. WhatsApp will open with your request.");
      window.open(whatsappUrl(suggestionMessage(form.area, form.budget), whatsappNumber), "_blank");
    } catch {
      setStatus("Could not save, but you can still continue on WhatsApp.");
      window.open(whatsappUrl(suggestionMessage(form.area, form.budget), whatsappNumber), "_blank");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-lift">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Name
          <input value={form.name} onChange={(event) => update("name", event.target.value)} className="control-input" required />
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          WhatsApp number
          <input value={form.phone} onChange={(event) => update("phone", event.target.value)} className="control-input" required />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-ink">
          Area to organize
          <select value={form.area} onChange={(event) => update("area", event.target.value)} className="control-input">
            {areas.map((area) => <option key={area}>{area}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium text-ink">
          Budget
          <select value={form.budget} onChange={(event) => update("budget", event.target.value)} className="control-input">
            {budgets.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium text-ink">
        Message
        <textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows={4} placeholder="Tell us what you want to fix. You can share photos on WhatsApp after submitting." className="rounded-xl border border-lineStrong px-3 py-2 text-sm font-medium text-ink outline-none transition placeholder:text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/15" />
      </label>
      <button className="focus-ring h-12 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-crisp transition hover:bg-primaryDark">Send request</button>
      {status ? <p className="text-xs font-medium text-muted">{status}</p> : null}
    </form>
  );
}
