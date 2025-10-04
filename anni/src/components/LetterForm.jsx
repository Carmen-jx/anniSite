import React, { useEffect, useRef, useState } from "react";

export default function LetterForm({
  open,
  onClose,
  onSubmit,
  initialData = null,
  errorMessage = "",
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [published, setPublished] = useState(false);
  const inputRef = useRef(null);
  const isEditing = Boolean(initialData?.id);

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title ?? "");
      setContent(initialData?.content?? "");
      setPublished(
        initialData?.published ?? initialData?.is_visible ?? false
      );
      setSaving(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    else {
      return;
    }
  }, [open, initialData]);

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && onClose?.(); 
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      setSaving(true);
      await onSubmit({
        id: initialData?.id,
        title: title.trim(),
        content: content.trim(),
        published,
      });
    } catch (error) {
      console.error('Failed to submit letter:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="letter-form">
      <h2 className="form-title">Dear Trevor</h2>
      {errorMessage && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}
      
      <label className="field">
        <span className="label">Title</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span className="label">Content</span>
        <textarea
          placeholder="Write your letter here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
      </label>

      <label className="field field-checkbox">
        <span className="label">Publish</span>
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
      </label>

      <div className="form-actions">
        <button className="btn" type="submit" disabled={saving || !title.trim() || !content.trim()}>
          {saving ? "Saving…" : isEditing ? "Update" : "Send"}
        </button>
      </div>
    </form>
  );
}
