"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_SITE_CONTENT,
  SiteContent,
  getValueByPath,
  loadLocalSiteContent,
  loadRemoteSiteContent,
  persistSiteContent,
  resetPersistedSiteContent,
  setValueByPath,
} from "@/lib/site-content";

interface SiteContentContextValue {
  content: SiteContent;
  isEditMode: boolean;
  setEditMode: (editing: boolean) => void;
  hasUnsavedChanges: boolean;
  saving: boolean;
  lastSavedAt: string | null;
  setByPath: (path: string, value: unknown) => void;
  getByPath: (path: string) => unknown;
  replaceContent: (next: SiteContent) => void;
  saveAndPublish: () => Promise<{ remoteSynced: boolean }>;
  resetToDefault: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isEditMode, setEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setContent(loadLocalSiteContent());
    loadRemoteSiteContent().then((remote) => {
      if (remote) setContent(remote);
    });

    const onUpdated = () => {
      setContent(loadLocalSiteContent());
    };
    window.addEventListener("vlearnin:content-updated", onUpdated);
    return () => window.removeEventListener("vlearnin:content-updated", onUpdated);
  }, []);

  const setByPath = useCallback((path: string, value: unknown) => {
    setContent((prev) => setValueByPath(prev, path, value));
    setHasUnsavedChanges(true);
  }, []);

  const getByPath = useCallback(
    (path: string) => getValueByPath(content, path),
    [content],
  );

  const replaceContent = useCallback((next: SiteContent) => {
    setContent(next);
    setHasUnsavedChanges(true);
  }, []);

  const saveAndPublish = useCallback(async () => {
    setSaving(true);
    try {
      const res = await persistSiteContent(content);
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date().toLocaleTimeString());
      return res;
    } finally {
      setSaving(false);
    }
  }, [content]);

  const resetToDefault = useCallback(async () => {
    setSaving(true);
    try {
      const def = await resetPersistedSiteContent();
      setContent(def);
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isEditMode,
        setEditMode,
        hasUnsavedChanges,
        saving,
        lastSavedAt,
        setByPath,
        getByPath,
        replaceContent,
        saveAndPublish,
        resetToDefault,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    return {
      content: DEFAULT_SITE_CONTENT,
      isEditMode: false,
      setEditMode: () => {},
      hasUnsavedChanges: false,
      saving: false,
      lastSavedAt: null,
      setByPath: () => {},
      getByPath: (path: string) => getValueByPath(DEFAULT_SITE_CONTENT, path),
      replaceContent: () => {},
      saveAndPublish: async () => ({ remoteSynced: false }),
      resetToDefault: async () => {},
    };
  }
  return ctx;
}
